import { z } from "zod";
import {
  ANIMATION_PRESETS,
  ELEMENT_TYPES,
  EXPORT_TYPES,
  LAYOUT_IDS,
  PROJECT_STATUSES,
  PROJECT_TYPES,
  TEMPLATE_IDS,
  THEME_IDS,
  TRANSITION_TYPES,
} from "./enums";
import { FORMAT_IDS, dimensionsForFormat } from "./formats";

const hexColor = z
  .string()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Invalid hex color");

export const themeTokensSchema = z.object({
  colors: z.object({
    background: hexColor,
    foreground: hexColor,
    accent: hexColor,
    muted: hexColor.optional(),
    surface: hexColor.optional(),
  }),
  fonts: z.object({
    display: z.string().min(1),
    body: z.string().min(1),
  }),
  radii: z.object({
    sm: z.number().nonnegative(),
    md: z.number().nonnegative(),
    lg: z.number().nonnegative(),
  }),
  cta: z
    .object({
      background: hexColor.optional(),
      foreground: hexColor.optional(),
    })
    .optional(),
});

export const animationSchema = z.object({
  in: z.enum(ANIMATION_PRESETS).default("none"),
  out: z.enum(ANIMATION_PRESETS).default("none"),
  loop: z.enum(ANIMATION_PRESETS).optional(),
  delayMs: z.number().nonnegative().optional(),
  durationMs: z.number().positive().optional(),
});

export const timingSchema = z.object({
  durationSec: z.number().positive().default(3),
  transition: z.enum(TRANSITION_TYPES).default("fade"),
  transitionMs: z.number().nonnegative().optional(),
});

export const audioTrackSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["music", "voiceover", "sfx"]),
  url: z.string().url().optional(),
  startSec: z.number().nonnegative().default(0),
  volume: z.number().min(0).max(1).default(1),
});

export const elementSchema = z.object({
  id: z.string().min(1),
  type: z.enum(ELEMENT_TYPES),
  content: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  zIndex: z.number().int(),
  rotation: z.number().optional(),
  opacity: z.number().min(0).max(1).optional(),
  animation: animationSchema.optional(),
});

export const backgroundSchema = z.object({
  type: z.enum(["color", "image", "video", "gradient"]),
  value: z.string().min(1),
  overlayOpacity: z.number().min(0).max(1).optional(),
  /** Video trim — ignored for PNG carousels */
  trimStartSec: z.number().nonnegative().optional(),
  trimEndSec: z.number().positive().optional(),
});

export const sceneSchema = z.object({
  id: z.string().min(1),
  layout: z.enum(LAYOUT_IDS),
  role: z.string().min(1).optional(),
  elements: z.array(elementSchema).default([]),
  background: backgroundSchema,
  timing: timingSchema.optional(),
  animation: animationSchema.optional(),
});

export const exportSettingsSchema = z.object({
  type: z.enum(EXPORT_TYPES).default("telegram_album"),
  quality: z.enum(["draft", "standard", "high"]).default("standard"),
  includeWatermark: z.boolean().default(false),
});

export const projectAudioSchema = z.object({
  tracks: z.array(audioTrackSchema).default([]),
});

/**
 * Canonical project JSON — Remotion-independent.
 * Dimensions are derived from `format`, never stored as free-form pixels.
 */
export const projectSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(PROJECT_TYPES),
    title: z.string().min(1),
    status: z.enum(PROJECT_STATUSES).default("draft"),
    themeId: z.enum(THEME_IDS),
    templateId: z.enum(TEMPLATE_IDS),
    format: z.enum(FORMAT_IDS),
    theme: themeTokensSchema.optional(),
    scenes: z.array(sceneSchema).min(1),
    exportSettings: exportSettingsSchema.default({
      type: "telegram_album",
      quality: "standard",
      includeWatermark: false,
    }),
    /** Future video fields — optional so PNG projects stay valid */
    audio: projectAudioSchema.optional(),
    timingDefaults: timingSchema.optional(),
  })
  .transform((project) => {
    const { width, height } = dimensionsForFormat(project.format);
    return {
      ...project,
      width,
      height,
    };
  });

export type ThemeTokens = z.infer<typeof themeTokensSchema>;
export type Element = z.infer<typeof elementSchema>;
export type Scene = z.infer<typeof sceneSchema>;
export type ProjectInput = z.input<typeof projectSchema>;
export type Project = z.infer<typeof projectSchema>;

export function parseProject(data: unknown): Project {
  return projectSchema.parse(data);
}

export function safeParseProject(data: unknown) {
  return projectSchema.safeParse(data);
}
