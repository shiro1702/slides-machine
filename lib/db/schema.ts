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
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
  },
  (table) => [
    index("jobs_project_id_idx").on(table.projectId),
    index("jobs_status_idx").on(table.status),
  ],
);

export type User = typeof users.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
export type JobRow = typeof jobs.$inferSelect;
