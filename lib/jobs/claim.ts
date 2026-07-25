import { and, eq, inArray, isNull, lt, or, sql } from "drizzle-orm";
import { getDb, type Db } from "@/lib/db";
import { jobs, type JobResult, type JobRow } from "@/lib/db/schema";
import { JOB_TYPES } from "@/lib/schemas/enums";
import { JOB_LEASE_MS, JOB_MAX_ATTEMPTS } from "./constants";

export type JobType = (typeof JOB_TYPES)[number];

function leaseExpiry(from = new Date()): Date {
  return new Date(from.getTime() + JOB_LEASE_MS);
}

/**
 * Atomically claim the next queued (or stale running) job of the given types.
 * Uses optimistic UPDATE … RETURNING — safe with neon-http (no row locks).
 */
export async function claimNextJob(params: {
  types: JobType[];
  db?: Db;
}): Promise<JobRow | null> {
  const db = params.db ?? getDb();
  const now = new Date();

  const candidates = await db
    .select({ id: jobs.id })
    .from(jobs)
    .where(
      and(
        inArray(jobs.type, params.types),
        lt(jobs.attempts, JOB_MAX_ATTEMPTS),
        or(
          eq(jobs.status, "queued"),
          and(
            eq(jobs.status, "running"),
            or(
              isNull(jobs.leaseExpiresAt),
              lt(jobs.leaseExpiresAt, now),
            ),
          ),
        ),
      ),
    )
    .orderBy(jobs.createdAt)
    .limit(5);

  for (const candidate of candidates) {
    const [claimed] = await db
      .update(jobs)
      .set({
        status: "running",
        attempts: sql`${jobs.attempts} + 1`,
        startedAt: now,
        leaseExpiresAt: leaseExpiry(now),
        error: null,
        finishedAt: null,
      })
      .where(
        and(
          eq(jobs.id, candidate.id),
          or(
            eq(jobs.status, "queued"),
            and(
              eq(jobs.status, "running"),
              or(
                isNull(jobs.leaseExpiresAt),
                lt(jobs.leaseExpiresAt, now),
              ),
            ),
          ),
        ),
      )
      .returning();

    if (claimed) {
      return claimed;
    }
  }

  return null;
}

export async function extendJobLease(params: {
  jobId: string;
  db?: Db;
}): Promise<void> {
  const db = params.db ?? getDb();
  await db
    .update(jobs)
    .set({ leaseExpiresAt: leaseExpiry() })
    .where(and(eq(jobs.id, params.jobId), eq(jobs.status, "running")));
}

export async function markJobSucceeded(params: {
  jobId: string;
  result: JobResult;
  db?: Db;
}): Promise<JobRow | null> {
  const db = params.db ?? getDb();
  const [row] = await db
    .update(jobs)
    .set({
      status: "succeeded",
      result: params.result,
      finishedAt: new Date(),
      leaseExpiresAt: null,
      error: null,
    })
    .where(eq(jobs.id, params.jobId))
    .returning();
  return row ?? null;
}

export async function markJobFailed(params: {
  jobId: string;
  errorCode: string;
  result?: JobResult;
  /** If true and attempts < max, re-queue; otherwise permanent fail. */
  retryable?: boolean;
  db?: Db;
}): Promise<JobRow | null> {
  const db = params.db ?? getDb();
  const existing = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, params.jobId))
    .limit(1);
  const current = existing[0];
  if (!current) return null;

  const canRetry =
    params.retryable !== false && current.attempts < JOB_MAX_ATTEMPTS;

  const [row] = await db
    .update(jobs)
    .set({
      status: canRetry ? "queued" : "failed",
      error: params.errorCode,
      result: params.result ?? current.result ?? {},
      finishedAt: canRetry ? null : new Date(),
      leaseExpiresAt: null,
      startedAt: canRetry ? null : current.startedAt,
    })
    .where(eq(jobs.id, params.jobId))
    .returning();

  return row ?? null;
}

export async function mergeJobResult(params: {
  jobId: string;
  patch: Partial<JobResult>;
  db?: Db;
}): Promise<JobResult> {
  const db = params.db ?? getDb();
  const rows = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, params.jobId))
    .limit(1);
  const current = rows[0]?.result ?? {};
  const next = { ...current, ...params.patch };
  await db.update(jobs).set({ result: next }).where(eq(jobs.id, params.jobId));
  return next;
}

export async function enqueueJob(params: {
  projectId: string;
  type: JobType;
  result?: JobResult;
  db?: Db;
}): Promise<JobRow> {
  const db = params.db ?? getDb();
  const [job] = await db
    .insert(jobs)
    .values({
      projectId: params.projectId,
      type: params.type,
      status: "queued",
      result: params.result ?? {},
    })
    .returning();
  return job;
}
