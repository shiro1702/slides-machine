import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  JOB_STATUSES,
  JOB_TYPES,
  PROJECT_STATUSES,
  PROJECT_TYPES,
  USER_PLANS,
} from "@/lib/schemas/enums";

export const userPlanEnum = pgEnum("user_plan", [...USER_PLANS]);
export const projectTypeEnum = pgEnum("project_type", [...PROJECT_TYPES]);
export const projectStatusEnum = pgEnum("project_status", [...PROJECT_STATUSES]);
export const jobTypeEnum = pgEnum("job_type", [...JOB_TYPES]);
export const jobStatusEnum = pgEnum("job_status", [...JOB_STATUSES]);

export type BotFlowData = {
  nicheId?: string;
  topic?: string;
  styleId?: string;
  templateId?: string;
  projectId?: string;
  correlationId?: string;
  generationRequestId?: string;
  errorCode?: string;
  /** Telegram chat for async render delivery */
  chatId?: number;
  /** Progress message while PNG/album is in flight */
  progressMessageId?: number;
};

/** Stored on jobs.result after render / delivery */
export type JobResult = {
  slides?: Array<{
    sceneId: string;
    filename: string;
    pathname: string;
    url: string;
    width: number;
    height: number;
    bytes: number;
    contentType: string;
  }>;
  manifestPathname?: string;
  manifestUrl?: string;
  renderMs?: number;
  progressMessageId?: number;
  chatId?: number;
  telegramMessageIds?: number[];
  albumDeliveredAt?: string;
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    telegramId: text("telegram_id").notNull(),
    plan: userPlanEnum("plan").notNull().default("free"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("users_telegram_id_uidx").on(table.telegramId),
  ],
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: projectTypeEnum("type").notNull().default("carousel"),
    title: text("title").notNull(),
    status: projectStatusEnum("status").notNull().default("draft"),
    payload: jsonb("payload").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("projects_user_id_idx").on(table.userId),
    index("projects_status_idx").on(table.status),
  ],
);

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    type: jobTypeEnum("type").notNull(),
    status: jobStatusEnum("status").notNull().default("queued"),
    attempts: integer("attempts").notNull().default(0),
    error: text("error"),
    result: jsonb("result").$type<JobResult>().notNull().default({}),
    leaseExpiresAt: timestamp("lease_expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
  },
  (table) => [
    index("jobs_project_id_idx").on(table.projectId),
    index("jobs_status_idx").on(table.status),
    index("jobs_lease_expires_at_idx").on(table.leaseExpiresAt),
  ],
);

/** Telegram conversation state keyed by telegram_id */
export const botFlows = pgTable(
  "bot_flows",
  {
    telegramId: text("telegram_id").primaryKey(),
    step: text("step").notNull().default("idle"),
    data: jsonb("data").$type<BotFlowData>().notNull().default({}),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("bot_flows_updated_at_idx").on(table.updatedAt)],
);

/** Idempotency for Telegram webhook updates */
export const telegramUpdates = pgTable("telegram_updates", {
  updateId: text("update_id").primaryKey(),
  telegramId: text("telegram_id"),
  processedAt: timestamp("processed_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = typeof users.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
export type JobRow = typeof jobs.$inferSelect;
export type BotFlowRow = typeof botFlows.$inferSelect;
export type TelegramUpdateRow = typeof telegramUpdates.$inferSelect;
