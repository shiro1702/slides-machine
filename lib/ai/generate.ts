import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";
import {
  ELEMENT_TYPES,
  LAYOUT_IDS,
  PROJECT_STATUSES,
  PROJECT_TYPES,
  TEMPLATE_IDS,
  THEME_IDS,
} from "@/lib/schemas/enums";
import { FORMAT_IDS } from "@/lib/schemas/formats";
import {
  parseProject,
  safeParseProject,
  type Project,
  type ProjectInput,
} from "@/lib/schemas";
import { buildFixtureProject } from "./fixture";
import { GenerationError } from "./errors";
import {
  buildCarouselPrompt,
  normalizeLlmJsonText,
  type GenerateCarouselInput,
} from "./prompt";

const MAX_ATTEMPTS = 3;

/** Loose schema for LLM structured output — then validated with projectSchema. */
const llmProjectSchema = z.object({
  id: z.string().min(1),
  type: z.enum(PROJECT_TYPES),
  title: z.string().min(1),
  status: z.enum(PROJECT_STATUSES).optional(),
  themeId: z.enum(THEME_IDS),
  templateId: z.enum(TEMPLATE_IDS),
  format: z.enum(FORMAT_IDS),
  theme: z.unknown().optional(),
  scenes: z
    .array(
      z.object({
        id: z.string().min(1),
        layout: z.enum(LAYOUT_IDS),
        role: z.string().optional(),
        background: z.object({
          type: z.enum(["color", "image", "video", "gradient"]),
          value: z.string().min(1),
          overlayOpacity: z.number().optional(),
        }),
        elements: z
          .array(
            z.object({
              id: z.string().min(1),
              type: z.enum(ELEMENT_TYPES),
              content: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
              x: z.number(),
              y: z.number(),
              width: z.number(),
              height: z.number(),
              zIndex: z.number(),
            }),
          )
          .default([]),
      }),
    )
    .min(1),
  exportSettings: z
    .object({
      type: z.enum(["png_zip", "mp4", "telegram_album"]).optional(),
      quality: z.enum(["draft", "standard", "high"]).optional(),
      includeWatermark: z.boolean().optional(),
    })
    .optional(),
});

export type LlmMode = "fixture" | "groq";

export function resolveLlmMode(
  env: NodeJS.ProcessEnv = process.env,
): LlmMode {
  const explicit = env.LLM_MODE?.trim().toLowerCase();
  if (explicit === "fixture") return "fixture";
  if (explicit === "groq") return "groq";
  if (env.GROQ_API_KEY) return "groq";
  return "fixture";
}

export type GenerateCarouselResult = {
  project: Project;
  mode: LlmMode;
  attempts: number;
};

export async function generateCarouselProject(
  input: GenerateCarouselInput,
  options?: { mode?: LlmMode; signal?: AbortSignal },
): Promise<GenerateCarouselResult> {
  const mode = options?.mode ?? resolveLlmMode();

  if (mode === "fixture") {
    const project = parseProject(buildFixtureProject(input));
    return { project, mode, attempts: 1 };
  }

  return generateWithGroq(input, options?.signal);
}

async function generateWithGroq(
  input: GenerateCarouselInput,
  signal?: AbortSignal,
): Promise<GenerateCarouselResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new GenerationError(
      "provider_error",
      "GROQ_API_KEY is not set",
    );
  }

  const groq = createGroq({ apiKey });
  const model = groq(process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile");
  const basePrompt = buildCarouselPrompt(input);

  let lastError: GenerationError | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (signal?.aborted) {
      throw new GenerationError("timeout", "Generation aborted");
    }

    const repairHint =
      attempt > 1 && lastError
        ? `\n\nПредыдущая попытка failed (${lastError.code}): ${lastError.message}. Исправь JSON строго под схему.`
        : "";

    try {
      const { object } = await generateObject({
        model,
        schema: llmProjectSchema,
        prompt: basePrompt + repairHint,
        abortSignal: signal,
      });

      const merged: ProjectInput = {
        ...(object as ProjectInput),
        id: input.projectId,
        themeId: input.style.id,
        templateId: input.template.id,
        format: input.format,
        theme: input.style.tokens,
        status: "draft",
        exportSettings: {
          type: "telegram_album",
          quality: "standard",
          includeWatermark: false,
          ...object.exportSettings,
        },
      };

      const parsed = safeParseProject(merged);
      if (parsed.success) {
        return { project: parsed.data, mode: "groq", attempts: attempt };
      }

      lastError = new GenerationError(
        "schema_mismatch",
        parsed.error.issues
          .slice(0, 3)
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
      );
    } catch (error) {
      lastError = mapProviderError(error);
      if (lastError.code === "timeout" || lastError.code === "provider_error") {
        if (attempt === MAX_ATTEMPTS) break;
        continue;
      }
    }
  }

  throw (
    lastError ??
    new GenerationError("internal", "Generation failed without details")
  );
}

function mapProviderError(error: unknown): GenerationError {
  if (error instanceof GenerationError) return error;

  const message = error instanceof Error ? error.message : String(error);
  const name = error instanceof Error ? error.name : "";

  if (
    name === "AbortError" ||
    /timeout|aborted|ETIMEDOUT/i.test(message)
  ) {
    return new GenerationError("timeout", message, error);
  }

  if (/JSON|parse|Unexpected token/i.test(message)) {
    return new GenerationError("invalid_json", message, error);
  }

  return new GenerationError("provider_error", message, error);
}

/** Parse raw LLM text (for tests / repair path without generateObject). */
export function parseProjectFromLlmText(raw: string): Project {
  let json: unknown;
  try {
    json = JSON.parse(normalizeLlmJsonText(raw));
  } catch (error) {
    throw new GenerationError(
      "invalid_json",
      error instanceof Error ? error.message : "Invalid JSON",
      error,
    );
  }

  const parsed = safeParseProject(json);
  if (!parsed.success) {
    throw new GenerationError(
      "schema_mismatch",
      parsed.error.issues
        .slice(0, 5)
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; "),
    );
  }
  return parsed.data;
}
