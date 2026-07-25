import { and, eq } from "drizzle-orm";
import { getDb, type Db } from "@/lib/db";
import { jobs, projects, telegramUpdates } from "@/lib/db/schema";
import type { Project } from "@/lib/schemas";
import { upsertTelegramUser } from "@/lib/telegram/users";
import { kickJobWorker } from "@/lib/jobs";

export type FlowProjectMeta = {
  nicheId: string;
  topic: string;
  styleId: string;
  templateId: string;
  correlationId: string;
  generationRequestId: string;
  errorCode?: string;
  project?: Project;
  chatId?: number;
  progressMessageId?: number;
};

export type CreateDraftParams = {
  telegramId: string;
  title: string;
  nicheId: string;
  topic: string;
  styleId: string;
  templateId: string;
  correlationId: string;
  generationRequestId: string;
  db?: Db;
};

export async function createDraftProject(params: CreateDraftParams) {
  const db = params.db ?? getDb();
  const user = await upsertTelegramUser(params.telegramId);

  const [project] = await db
    .insert(projects)
    .values({
      userId: user.id,
      type: "carousel",
      title: params.title.slice(0, 200) || "Карусель",
      status: "draft",
      payload: {
        nicheId: params.nicheId,
        topic: params.topic,
        styleId: params.styleId,
        templateId: params.templateId,
        correlationId: params.correlationId,
        generationRequestId: params.generationRequestId,
      } satisfies FlowProjectMeta,
      updatedAt: new Date(),
    })
    .returning();

  return { user, project };
}

export async function findProjectByGenerationRequest(params: {
  userId: string;
  generationRequestId: string;
  db?: Db;
}) {
  const db = params.db ?? getDb();
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, params.userId));

  return (
    rows.find((row) => {
      const payload = row.payload as FlowProjectMeta;
      return payload.generationRequestId === params.generationRequestId;
    }) ?? null
  );
}

export async function markProjectReady(params: {
  projectId: string;
  userId: string;
  project: Project;
  meta: Omit<FlowProjectMeta, "project" | "errorCode">;
  db?: Db;
  /** Kick async worker after enqueue (default true). */
  kickWorker?: boolean;
}) {
  const db = params.db ?? getDb();

  const existingJobs = await db
    .select()
    .from(jobs)
    .where(
      and(
        eq(jobs.projectId, params.projectId),
        eq(jobs.type, "render_carousel"),
      ),
    )
    .limit(1);

  const payload: FlowProjectMeta = {
    ...params.meta,
    project: {
      ...params.project,
      id: params.projectId,
      status: "ready",
    },
  };

  const [updated] = await db
    .update(projects)
    .set({
      title: params.project.title,
      status: "ready",
      payload,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(projects.id, params.projectId),
        eq(projects.userId, params.userId),
      ),
    )
    .returning();

  if (!updated) {
    throw new Error("Project not found or not owned by user");
  }

  if (existingJobs[0]) {
    if (params.kickWorker !== false) {
      kickJobWorker();
    }
    return { project: updated, job: existingJobs[0], createdJob: false };
  }

  const [job] = await db
    .insert(jobs)
    .values({
      projectId: params.projectId,
      type: "render_carousel",
      status: "queued",
      result: {
        chatId: params.meta.chatId,
        progressMessageId: params.meta.progressMessageId,
      },
    })
    .returning();

  if (params.kickWorker !== false) {
    kickJobWorker();
  }

  return { project: updated, job, createdJob: true };
}

export async function markProjectFailed(params: {
  projectId: string;
  userId: string;
  errorCode: string;
  meta: Omit<FlowProjectMeta, "project" | "errorCode">;
  db?: Db;
}) {
  const db = params.db ?? getDb();
  const [updated] = await db
    .update(projects)
    .set({
      status: "failed",
      payload: {
        ...params.meta,
        errorCode: params.errorCode,
      } satisfies FlowProjectMeta,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(projects.id, params.projectId),
        eq(projects.userId, params.userId),
      ),
    )
    .returning();

  return updated;
}

/** Returns true if this update_id was newly claimed (not a duplicate). */
export async function claimTelegramUpdate(params: {
  updateId: number | string;
  telegramId?: string;
  db?: Db;
}): Promise<boolean> {
  const db = params.db ?? getDb();
  const updateId = String(params.updateId);

  try {
    await db.insert(telegramUpdates).values({
      updateId,
      telegramId: params.telegramId,
    });
    return true;
  } catch {
    return false;
  }
}

export async function getProjectForUser(params: {
  projectId: string;
  userId: string;
  db?: Db;
}) {
  const db = params.db ?? getDb();
  const rows = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.id, params.projectId),
        eq(projects.userId, params.userId),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}
