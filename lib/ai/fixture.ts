import { getStyle } from "@/lib/meta";
import type { ProjectInput } from "@/lib/schemas";
import type { GenerateCarouselInput } from "./prompt";

function layoutForRole(role: string): ProjectInput["scenes"][number]["layout"] {
  switch (role) {
    case "cover":
    case "problem":
    case "before":
    case "myth":
      return "cover_center";
    case "mistake":
    case "point":
    case "checklist_item":
      return "text_big_number";
    case "fix":
    case "solution":
    case "truth":
    case "why":
      return "checklist";
    case "example":
    case "summary":
    case "result":
    case "after":
      return "text_only";
    case "cta":
      return "cta";
    default:
      return "text_only";
  }
}

function slideCopy(
  role: string,
  index: number,
  topic: string,
): { headline: string; body?: string } {
  const shortTopic = topic.slice(0, 80);
  switch (role) {
    case "cover":
      return { headline: shortTopic };
    case "cta":
      return { headline: "Напиши «КАРУСЕЛЬ» в бот" };
    case "fix":
      return { headline: "Как исправить", body: "• История → ценность → оффер" };
    default:
      return {
        headline: `${String(index).padStart(2, "0")}`,
        body: `${role}: ${shortTopic}`,
      };
  }
}

/**
 * Deterministic carousel for tests / LLM_MODE=fixture (no API key).
 */
export function buildFixtureProject(
  input: GenerateCarouselInput,
): ProjectInput {
  const style = getStyle(input.style.id) ?? input.style;
  const bg = style.tokens.colors.background;
  const surface = style.tokens.colors.surface ?? bg;
  const accent = style.tokens.colors.accent;

  const scenes: ProjectInput["scenes"] = input.template.slideRoles.map(
    (role, i) => {
      const copy = slideCopy(role, i + 1, input.topic);
      const isCta = role === "cta";
      const elements: ProjectInput["scenes"][number]["elements"] = [
        {
          id: `e${i + 1}a`,
          type: "text",
          content: copy.headline,
          x: 80,
          y: isCta ? 520 : role === "cover" ? 480 : 200,
          width: 920,
          height: role === "cover" ? 200 : 120,
          zIndex: 1,
        },
      ];
      if (copy.body) {
        elements.push({
          id: `e${i + 1}b`,
          type: "text",
          content: copy.body,
          x: 80,
          y: 360,
          width: 920,
          height: 160,
          zIndex: 2,
        });
      }
      if (role === "cover") {
        elements.push({
          id: `e${i + 1}badge`,
          type: "badge",
          content: input.niche.label.slice(0, 16).toUpperCase(),
          x: 80,
          y: 360,
          width: 280,
          height: 56,
          zIndex: 3,
        });
      }

      return {
        id: `s${i + 1}`,
        layout: layoutForRole(role),
        role,
        background: {
          type: "color",
          value: isCta ? accent : i % 2 === 1 ? surface : bg,
        },
        elements,
        timing: { durationSec: 3, transition: "fade" },
      };
    },
  );

  return {
    id: input.projectId,
    type: "carousel",
    title: input.topic.slice(0, 80) || "Карусель",
    status: "draft",
    themeId: input.style.id,
    templateId: input.template.id,
    format: input.format,
    theme: style.tokens,
    exportSettings: {
      type: "telegram_album",
      quality: "standard",
      includeWatermark: false,
    },
    timingDefaults: {
      durationSec: 3,
      transition: "fade",
      transitionMs: 400,
    },
    scenes,
  };
}
