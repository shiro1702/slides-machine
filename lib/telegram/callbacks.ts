import { NICHE_IDS, THEME_IDS } from "@/lib/schemas/enums";
import type { NicheId, ThemeId } from "@/lib/meta";

export type ParsedCallback =
  | { type: "new_carousel" }
  | { type: "examples" }
  | { type: "how_it_works" }
  | { type: "niche"; nicheId: NicheId }
  | { type: "style"; styleId: ThemeId }
  | { type: "confirm_generate" }
  | { type: "retry_generate" }
  | { type: "cancel" }
  | { type: "unknown"; raw: string };

const NICHE_SET = new Set<string>(NICHE_IDS);
const STYLE_SET = new Set<string>(THEME_IDS);

export function parseCallbackData(data: string | undefined): ParsedCallback {
  if (!data) {
    return { type: "unknown", raw: "" };
  }

  if (data === "new_carousel") return { type: "new_carousel" };
  if (data === "examples") return { type: "examples" };
  if (data === "how_it_works") return { type: "how_it_works" };
  if (data === "confirm") return { type: "confirm_generate" };
  if (data === "retry") return { type: "retry_generate" };
  if (data === "cancel") return { type: "cancel" };

  if (data.startsWith("n:")) {
    const nicheId = data.slice(2);
    if (NICHE_SET.has(nicheId)) {
      return { type: "niche", nicheId: nicheId as NicheId };
    }
  }

  if (data.startsWith("s:")) {
    const styleId = data.slice(2);
    if (STYLE_SET.has(styleId)) {
      return { type: "style", styleId: styleId as ThemeId };
    }
  }

  return { type: "unknown", raw: data };
}
