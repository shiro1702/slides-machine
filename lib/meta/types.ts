import {
  LAYOUT_IDS,
  NICHE_IDS,
  TEMPLATE_IDS,
  THEME_IDS,
  type FormatId,
} from "@/lib/schemas";

export type NicheId = (typeof NICHE_IDS)[number];
export type TemplateId = (typeof TEMPLATE_IDS)[number];
export type ThemeId = (typeof THEME_IDS)[number];
export type LayoutId = (typeof LAYOUT_IDS)[number];
export type { FormatId };
