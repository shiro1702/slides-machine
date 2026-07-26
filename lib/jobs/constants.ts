/** Max attempts before a job is marked failed permanently. */
export const JOB_MAX_ATTEMPTS = 3;

/** How long a worker may hold a job before it can be reclaimed. */
export const JOB_LEASE_MS = 5 * 60 * 1000;

/** Backoff between retries (attempt is 1-based after claim increment). */
export const JOB_RETRY_BACKOFF_MS = [0, 5_000, 30_000, 120_000] as const;
