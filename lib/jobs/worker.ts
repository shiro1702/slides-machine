import { and, eq } from "drizzle-orm";
import { getDb, type Db } from "@/lib/db";
import { jobs, projects, users, type JobResult } from "@/lib/db/schema";
import type { FlowProjectMeta } from "@/lib/projects/create-from-flow";
import {
  claimNextJob,
  enqueueJob,
  markJobFailed,
  markJobSucceeded,
} from "./claim";
import { renderProjectPngs } from "@/lib/render";
import { uploadRenderToBlob } from "@/lib/render/upload-blob";
import {
  deleteTelegramMessage,
  editTelegramMessageText,
  sendMediaGroup,
  sendTelegramMessage,
} from "@/lib/telegram";
import { doneReplyMarkup } from "@/lib/telegram/keyboards";
import { MSG } from "@/lib/telegram/messages";
import { upsertFlow } from "@/lib/telegram/flow-store";
import { logEvent } from "@/lib/telemetry/logEvent";

export type WorkerRunSummary = {
  processed: number;
  succeeded: number;
  failed: number;
  skipped: number;
};

async function loadProjectContext(projectId: string, db: Db) {
  const rows = await db
    .select({
      project: projects,
      user: users,
    })
    .from(projects)
    .innerJoin(users, eq(users.id, projects.userId))
    .where(eq(projects.id, projectId))
    .limit(1);
  return rows[0] ?? null;
}

async function processRenderCarousel(jobId: string, projectId: string, db: Db) {
  const started = Date.now();
  const ctx = await loadProjectContext(projectId, db);
  if (!ctx) {
    await markJobFailed({
      jobId,
      errorCode: "project_not_found",
      retryable: false,
      db,
    });
    return "failed" as const;
  }

  const payload = ctx.project.payload as FlowProjectMeta & {
    chatId?: number;
    progressMessageId?: number;
  };
  const rawProject = payload.project;
  if (!rawProject) {
    await markJobFailed({
      jobId,
      errorCode: "missing_project_json",
      retryable: false,
      db,
    });
    return "failed" as const;
  }

  logEvent("render_started", {
    projectId,
    correlationId: payload.correlationId,
  });

  try {
    const render = await renderProjectPngs({
      ...rawProject,
      id: projectId,
    });

    let uploadResult: JobResult = {
      renderMs: render.renderMs,
      chatId: payload.chatId,
      progressMessageId: payload.progressMessageId,
    };

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const uploaded = await uploadRenderToBlob({
        projectId,
        jobId,
        render,
      });
      uploadResult = {
        ...uploadResult,
        ...uploaded.result,
      };
    } else {
      // Local/dev without Blob: keep bytes out of DB; delivery job will re-render
      uploadResult = {
        ...uploadResult,
        slides: render.slides.map((s) => ({
          sceneId: s.sceneId,
          filename: s.filename,
          pathname: `local://${s.filename}`,
          url: "",
          width: s.width,
          height: s.height,
          bytes: s.bytes.byteLength,
          contentType: s.contentType,
        })),
      };
      // Stash buffers on a module cache keyed by job for same-process delivery
      stashLocalPngs(
        `render-${projectId}`,
        render.slides.map((s) => ({
          filename: s.filename,
          bytes: s.bytes,
        })),
      );
    }

    await markJobSucceeded({ jobId, result: uploadResult, db });

    logEvent("render_succeeded", {
      projectId,
      correlationId: payload.correlationId,
      latencyMs: Date.now() - started,
    });

    // Enqueue delivery (or skip if already exists)
    const existingDelivery = await db
      .select()
      .from(jobs)
      .where(
        and(
          eq(jobs.projectId, projectId),
          eq(jobs.type, "send_to_telegram"),
        ),
      )
      .limit(1);

    if (!existingDelivery[0]) {
      await enqueueJob({
        projectId,
        type: "send_to_telegram",
        result: {
          chatId: payload.chatId,
          progressMessageId: payload.progressMessageId,
          slides: uploadResult.slides,
          manifestUrl: uploadResult.manifestUrl,
          renderMs: uploadResult.renderMs,
        },
        db,
      });
    }

    await db
      .update(projects)
      .set({ status: "ready", updatedAt: new Date() })
      .where(eq(projects.id, projectId));

    return "succeeded" as const;
  } catch (error) {
    const message = error instanceof Error ? error.message : "render_failed";
    logEvent("render_failed", {
      projectId,
      correlationId: payload.correlationId,
      latencyMs: Date.now() - started,
      errorCode: "render_failed",
    });
    await markJobFailed({
      jobId,
      errorCode: message.slice(0, 200),
      retryable: true,
      db,
    });
    await notifyRenderFailure(payload, ctx.user.telegramId);
    return "failed" as const;
  }
}

async function processSendToTelegram(
  jobId: string,
  projectId: string,
  existingResult: JobResult,
  db: Db,
) {
  const started = Date.now();

  if (existingResult.telegramMessageIds?.length) {
    logEvent("delivery_skipped_idempotent", { projectId });
    await markJobSucceeded({ jobId, result: existingResult, db });
    return "skipped" as const;
  }

  const ctx = await loadProjectContext(projectId, db);
  if (!ctx) {
    await markJobFailed({
      jobId,
      errorCode: "project_not_found",
      retryable: false,
      db,
    });
    return "failed" as const;
  }

  const payload = ctx.project.payload as FlowProjectMeta & {
    chatId?: number;
    progressMessageId?: number;
  };
  const chatId = existingResult.chatId ?? payload.chatId;
  if (chatId == null) {
    await markJobFailed({
      jobId,
      errorCode: "missing_chat_id",
      retryable: false,
      db,
    });
    return "failed" as const;
  }

  const title = ctx.project.title;
  const progressMessageId =
    existingResult.progressMessageId ?? payload.progressMessageId;

  logEvent("delivery_started", {
    projectId,
    correlationId: payload.correlationId,
  });

  try {
    const slides = existingResult.slides ?? [];
    const photosFromUrl = slides.filter((s) => s.url.startsWith("http"));

    let messageIds: number[] = [];
    if (photosFromUrl.length > 0) {
      messageIds = await sendMediaGroup({
        chatId,
        photos: photosFromUrl.map((s, i) => ({
          url: s.url,
          caption: i === 0 ? MSG.albumCaption(title) : undefined,
        })),
      });
    } else {
      const local = takeLocalPngs(`render-${projectId}`);
      if (!local?.length) {
        // Re-render for delivery when no Blob URLs (local smoke)
        const rawProject = payload.project;
        if (!rawProject) throw new Error("missing_project_json");
        const render = await renderProjectPngs({
          ...rawProject,
          id: projectId,
        });
        const { sendMediaGroupFromBuffers } = await import("@/lib/telegram");
        messageIds = await sendMediaGroupFromBuffers({
          chatId,
          photos: render.slides.map((s, i) => ({
            filename: s.filename,
            bytes: s.bytes,
            caption: i === 0 ? MSG.albumCaption(title) : undefined,
          })),
        });
      } else {
        const { sendMediaGroupFromBuffers } = await import("@/lib/telegram");
        messageIds = await sendMediaGroupFromBuffers({
          chatId,
          photos: local.map((s, i) => ({
            filename: s.filename,
            bytes: s.bytes,
            caption: i === 0 ? MSG.albumCaption(title) : undefined,
          })),
        });
      }
    }

    if (progressMessageId) {
      await deleteTelegramMessage({ chatId, messageId: progressMessageId });
    }

    await sendTelegramMessage({
      chatId,
      text: MSG.success(title, projectId),
      replyMarkup: doneReplyMarkup(),
    });

    const result: JobResult = {
      ...existingResult,
      telegramMessageIds: messageIds,
      albumDeliveredAt: new Date().toISOString(),
      chatId,
      progressMessageId,
    };
    await markJobSucceeded({ jobId, result, db });

    await upsertFlow({
      telegramId: ctx.user.telegramId,
      step: "done",
      data: {
        projectId,
        correlationId: payload.correlationId,
        chatId,
      },
      mergeData: true,
    });

    logEvent("delivery_succeeded", {
      projectId,
      correlationId: payload.correlationId,
      latencyMs: Date.now() - started,
    });

    return "succeeded" as const;
  } catch (error) {
    const message = error instanceof Error ? error.message : "delivery_failed";
    logEvent("delivery_failed", {
      projectId,
      correlationId: payload.correlationId,
      latencyMs: Date.now() - started,
      errorCode: "delivery_failed",
    });
    await markJobFailed({
      jobId,
      errorCode: message.slice(0, 200),
      retryable: true,
      result: existingResult,
      db,
    });
    await notifyRenderFailure(payload, ctx.user.telegramId, chatId, progressMessageId);
    return "failed" as const;
  }
}

async function notifyRenderFailure(
  payload: FlowProjectMeta & { chatId?: number; progressMessageId?: number },
  telegramId: string,
  chatId = payload.chatId,
  progressMessageId = payload.progressMessageId,
) {
  if (chatId == null) return;
  try {
    if (progressMessageId) {
      await editTelegramMessageText({
        chatId,
        messageId: progressMessageId,
        text: MSG.renderFailed,
        replyMarkup: doneReplyMarkup(),
      });
    } else {
      await sendTelegramMessage({
        chatId,
        text: MSG.renderFailed,
        replyMarkup: doneReplyMarkup(),
      });
    }
    await upsertFlow({
      telegramId,
      step: "done",
      data: { errorCode: "render_failed", correlationId: payload.correlationId },
      mergeData: true,
    });
  } catch {
    console.error("notifyRenderFailure failed");
  }
}

/** In-process PNG stash for local delivery without Blob */
const localPngCache = new Map<
  string,
  Array<{ filename: string; bytes: Buffer }>
>();

function stashLocalPngs(
  key: string,
  slides: Array<{ filename: string; bytes: Buffer }>,
) {
  localPngCache.set(key, slides);
}

function takeLocalPngs(key: string) {
  const value = localPngCache.get(key);
  if (value) localPngCache.delete(key);
  return value;
}

/**
 * Process up to `limit` jobs (render then delivery preferred via type order).
 */
export async function runJobWorker(params?: {
  limit?: number;
  db?: Db;
}): Promise<WorkerRunSummary> {
  const db = params?.db ?? getDb();
  const limit = params?.limit ?? 3;
  const summary: WorkerRunSummary = {
    processed: 0,
    succeeded: 0,
    failed: 0,
    skipped: 0,
  };

  for (let i = 0; i < limit; i++) {
    // Prefer delivery jobs that are ready, then renders
    const job =
      (await claimNextJob({
        types: ["send_to_telegram"],
        db,
      })) ??
      (await claimNextJob({
        types: ["render_carousel"],
        db,
      }));

    if (!job) break;
    summary.processed += 1;

    let outcome: "succeeded" | "failed" | "skipped";
    if (job.type === "render_carousel") {
      outcome = await processRenderCarousel(job.id, job.projectId, db);
    } else if (job.type === "send_to_telegram") {
      outcome = await processSendToTelegram(
        job.id,
        job.projectId,
        job.result ?? {},
        db,
      );
    } else {
      await markJobFailed({
        jobId: job.id,
        errorCode: "unsupported_job_type",
        retryable: false,
        db,
      });
      outcome = "failed";
    }

    if (outcome === "succeeded") summary.succeeded += 1;
    else if (outcome === "skipped") summary.skipped += 1;
    else summary.failed += 1;
  }

  return summary;
}
