import "dotenv/config";
import { eq } from "drizzle-orm";
import { createDb } from "../lib/db";
import { botFlows, jobs, projects, users } from "../lib/db/schema";
import { runCarouselGeneration } from "../lib/projects/run-generation";
import { upsertFlow, resetFlow } from "../lib/telegram/flow-store";

async function main() {
  const db = createDb();
  const telegramId = `smoke-flow-${Date.now()}`;

  await upsertFlow({
    telegramId,
    step: "await_style",
    data: {
      nicheId: "experts",
      topic: "5 ошибок в прогреве",
      styleId: "expert_minimal",
      correlationId: "smoke-corr",
    },
    db,
  });

  const result = await runCarouselGeneration({
    telegramId,
    nicheId: "experts",
    topic: "5 ошибок в прогреве",
    styleId: "expert_minimal",
    correlationId: "smoke-corr",
  });

  if (!result.ok) {
    throw new Error(`Generation failed: ${result.errorCode}`);
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.telegramId, telegramId))
    .limit(1);
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, result.projectId))
    .limit(1);
  const projectJobs = await db
    .select()
    .from(jobs)
    .where(eq(jobs.projectId, result.projectId));

  const renderJobs = projectJobs.filter((j) => j.type === "render_carousel");
  if (!user || !project || project.status !== "ready" || renderJobs.length !== 1) {
    throw new Error("Smoke path user→project→job failed");
  }

  // Idempotent replay
  const replay = await runCarouselGeneration({
    telegramId,
    nicheId: "experts",
    topic: "5 ошибок в прогреве",
    styleId: "expert_minimal",
    correlationId: "smoke-corr",
    generationRequestId: (
      project.payload as { generationRequestId?: string }
    ).generationRequestId,
  });
  if (!replay.ok || replay.projectId !== result.projectId) {
    throw new Error("Idempotent replay failed");
  }

  const jobsAfter = await db
    .select()
    .from(jobs)
    .where(eq(jobs.projectId, result.projectId));
  const renderAfter = jobsAfter.filter((j) => j.type === "render_carousel");
  if (renderAfter.length !== 1) {
    throw new Error("Duplicate render job created on replay");
  }

  await resetFlow(telegramId, db);
  const flow = await db
    .select()
    .from(botFlows)
    .where(eq(botFlows.telegramId, telegramId))
    .limit(1);

  console.log(
    JSON.stringify(
      {
        ok: true,
        userId: user.id,
        projectId: project.id,
        jobId: renderJobs[0].id,
        flowStep: flow[0]?.step,
        llmMode: result.llmMode,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
