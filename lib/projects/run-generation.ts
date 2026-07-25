import {
  getNiche,
  getStyle,
  getTemplate,
  templateForNiche,
} from "@/lib/meta";
import {
  generateCarouselProject,
  GenerationError,
  type GenerationErrorCode,
} from "@/lib/ai";
import {
  createDraftProject,
  findProjectByGenerationRequest,
  markProjectFailed,
  markProjectReady,
} from "@/lib/projects/create-from-flow";
import { upsertTelegramUser } from "@/lib/telegram/users";
import {
  hashTelegramId,
  logEvent,
  newCorrelationId,
} from "@/lib/telemetry/logEvent";

export type RunGenerationParams = {
  telegramId: string;
  nicheId: string;
  topic: string;
  styleId: string;
  /** Reuse existing correlation / request for retries */
  correlationId?: string;
  generationRequestId?: string;
  existingProjectId?: string;
};

export type RunGenerationSuccess = {
  ok: true;
  projectId: string;
  title: string;
  correlationId: string;
  attempts: number;
  llmMode: string;
};

export type RunGenerationFailure = {
  ok: false;
  errorCode: GenerationErrorCode;
  projectId?: string;
  correlationId: string;
};

export async function runCarouselGeneration(
  params: RunGenerationParams,
): Promise<RunGenerationSuccess | RunGenerationFailure> {
  const correlationId = params.correlationId ?? newCorrelationId();
  const generationRequestId =
    params.generationRequestId ??
    `gen_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const telegramIdHash = hashTelegramId(params.telegramId);

  const niche = getNiche(params.nicheId as never);
  const style = getStyle(params.styleId as never);
  const templateId = templateForNiche(params.nicheId as never);
  const template = getTemplate(templateId);

  if (!niche || !style || !template) {
    logEvent("generation_failed", {
      correlationId,
      telegramIdHash,
      errorCode: "internal",
    });
    return { ok: false, errorCode: "internal", correlationId };
  }

  const user = await upsertTelegramUser(params.telegramId);

  // Idempotency: same generationRequestId → return existing ready project
  const existing = await findProjectByGenerationRequest({
    userId: user.id,
    generationRequestId,
  });
  if (existing?.status === "ready") {
    const payload = existing.payload as { project?: { title?: string } };
    return {
      ok: true,
      projectId: existing.id,
      title: payload.project?.title ?? existing.title,
      correlationId,
      attempts: 0,
      llmMode: "cached",
    };
  }

  let projectId = params.existingProjectId ?? existing?.id;

  if (!projectId) {
    const draft = await createDraftProject({
      telegramId: params.telegramId,
      title: params.topic.slice(0, 200) || "Карусель",
      nicheId: niche.id,
      topic: params.topic,
      styleId: style.id,
      templateId: template.id,
      correlationId,
      generationRequestId,
    });
    projectId = draft.project.id;
  }

  const meta = {
    nicheId: niche.id,
    topic: params.topic,
    styleId: style.id,
    templateId: template.id,
    correlationId,
    generationRequestId,
  };

  logEvent("generation_started", {
    correlationId,
    telegramIdHash,
    projectId,
    nicheId: niche.id,
    styleId: style.id,
    templateId: template.id,
  });

  const started = Date.now();

  try {
    const { project, mode, attempts } = await generateCarouselProject({
      topic: params.topic,
      niche,
      style,
      template,
      format: "portrait",
      projectId,
    });

    await markProjectReady({
      projectId,
      userId: user.id,
      project: { ...project, id: projectId, status: "ready" },
      meta,
    });

    logEvent("generation_succeeded", {
      correlationId,
      telegramIdHash,
      projectId,
      latencyMs: Date.now() - started,
      attempts,
      llmMode: mode,
      nicheId: niche.id,
      styleId: style.id,
      templateId: template.id,
    });

    return {
      ok: true,
      projectId,
      title: project.title,
      correlationId,
      attempts,
      llmMode: mode,
    };
  } catch (error) {
    const errorCode: GenerationErrorCode =
      error instanceof GenerationError ? error.code : "internal";

    await markProjectFailed({
      projectId,
      userId: user.id,
      errorCode,
      meta,
    });

    logEvent("generation_failed", {
      correlationId,
      telegramIdHash,
      projectId,
      latencyMs: Date.now() - started,
      errorCode,
      nicheId: niche.id,
      styleId: style.id,
      templateId: template.id,
    });

    return { ok: false, errorCode, projectId, correlationId };
  }
}
