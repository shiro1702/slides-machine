import "dotenv/config";
import { eq } from "drizzle-orm";
import { createDb } from "../lib/db";
import { jobs, projects, users } from "../lib/db/schema";
import { mistakesPortrait } from "../fixtures/mistakes";
import { parseProject } from "../lib/schemas";

async function main() {
  const db = createDb();
  const telegramId = `smoke-${Date.now()}`;

  const [user] = await db
    .insert(users)
    .values({ telegramId, plan: "free" })
    .returning();

  const projectPayload = parseProject({
    ...mistakesPortrait,
    id: `db-smoke-${user.id}`,
  });

  const [project] = await db
    .insert(projects)
    .values({
      userId: user.id,
      type: "carousel",
      title: projectPayload.title,
      status: "draft",
      payload: projectPayload,
    })
    .returning();

  const [job] = await db
    .insert(jobs)
    .values({
      projectId: project.id,
      type: "generate_content",
      status: "queued",
    })
    .returning();

  const readUser = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);
  const readProject = await db
    .select()
    .from(projects)
    .where(eq(projects.id, project.id))
    .limit(1);
  const readJob = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, job.id))
    .limit(1);

  if (!readUser[0] || !readProject[0] || !readJob[0]) {
    throw new Error("Smoke read-back failed");
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        userId: user.id,
        projectId: project.id,
        jobId: job.id,
        telegramId,
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
