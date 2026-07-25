import { NextRequest, NextResponse } from "next/server";
import { hasDatabaseUrl } from "@/lib/db";
import { runJobWorker } from "@/lib/jobs/worker";

export const runtime = "nodejs";
export const maxDuration = 300;

function authorize(request: NextRequest): boolean {
  const secret =
    process.env.CRON_SECRET ?? process.env.JOB_WORKER_SECRET ?? "";
  if (!secret) {
    // Allow in local/dev without secret so smoke scripts work
    return process.env.NODE_ENV !== "production";
  }
  const header = request.headers.get("authorization");
  const bearer = header?.startsWith("Bearer ")
    ? header.slice("Bearer ".length)
    : null;
  const cronHeader = request.headers.get("x-cron-secret");
  return bearer === secret || cronHeader === secret;
}

/**
 * Process queued render_carousel / send_to_telegram jobs.
 * Triggered by fire-and-forget kick after enqueue, or Vercel Cron.
 */
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!hasDatabaseUrl()) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL is not set" },
      { status: 503 },
    );
  }

  try {
    const summary = await runJobWorker({ limit: 3 });
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "worker failed";
    console.error(
      JSON.stringify({ type: "jobs", event: "worker_error", message }),
    );
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

/** Vercel Cron uses GET by default for some setups — support both. */
export async function GET(request: NextRequest) {
  return POST(request);
}
