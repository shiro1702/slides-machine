/**
 * Fire-and-forget kick so the Telegram webhook does not wait for PNG render.
 * Failures are non-fatal — Vercel Cron will pick up queued jobs.
 */
export function kickJobWorker(baseUrl?: string): void {
  const secret =
    process.env.CRON_SECRET ?? process.env.JOB_WORKER_SECRET ?? "";

  let origin = baseUrl ?? process.env.NEXT_PUBLIC_APP_URL ?? null;
  if (!origin && process.env.VERCEL_URL) {
    origin = `https://${process.env.VERCEL_URL}`;
  }

  if (!origin || !secret) {
    console.warn(
      JSON.stringify({
        type: "jobs",
        event: "worker_kick_skipped",
        reason: !origin ? "no_origin" : "no_secret",
      }),
    );
    return;
  }

  const url = `${origin.replace(/\/$/, "")}/api/jobs/worker`;

  void fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ source: "kick" }),
  }).catch((error) => {
    console.error(
      JSON.stringify({
        type: "jobs",
        event: "worker_kick_failed",
        message: error instanceof Error ? error.message : "kick failed",
      }),
    );
  });
}
