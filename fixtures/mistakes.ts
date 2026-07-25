import type { ProjectInput } from "@/lib/schemas";
import { getStyle } from "@/lib/meta";

function mistakesBase(
  format: ProjectInput["format"],
  idSuffix: string,
): ProjectInput {
  const style = getStyle("expert_minimal")!;

  return {
    id: `fixture-mistakes-${idSuffix}`,
    type: "carousel",
    title: "5 ошибок в прогреве перед продажей",
    status: "draft",
    themeId: "expert_minimal",
    templateId: "mistakes",
    format,
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
    scenes: [
      {
        id: "s1",
        layout: "cover_center",
        role: "cover",
        background: { type: "color", value: style.tokens.colors.background },
        elements: [
          {
            id: "e1",
            type: "text",
            content: "5 ошибок в прогреве",
            x: 80,
            y: 480,
            width: 920,
            height: 200,
            zIndex: 1,
          },
          {
            id: "e2",
            type: "badge",
            content: "ЭКСПЕРТ",
            x: 80,
            y: 360,
            width: 200,
            height: 56,
            zIndex: 2,
          },
        ],
        timing: { durationSec: 3, transition: "fade" },
      },
      {
        id: "s2",
        layout: "text_big_number",
        role: "mistake",
        background: { type: "color", value: style.tokens.colors.background },
        elements: [
          {
            id: "e3",
            type: "text",
            content: "01",
            x: 80,
            y: 200,
            width: 300,
            height: 120,
            zIndex: 1,
          },
          {
            id: "e4",
            type: "text",
            content: "Сразу продавать без доверия",
            x: 80,
            y: 360,
            width: 920,
            height: 160,
            zIndex: 2,
          },
        ],
      },
      {
        id: "s3",
        layout: "text_only",
        role: "mistake",
        background: { type: "color", value: style.tokens.colors.surface! },
        elements: [
          {
            id: "e5",
            type: "text",
            content: "Писать длинные посты без структуры",
            x: 80,
            y: 400,
            width: 920,
            height: 200,
            zIndex: 1,
          },
        ],
      },
      {
        id: "s4",
        layout: "checklist",
        role: "fix",
        background: { type: "color", value: style.tokens.colors.background },
        elements: [
          {
            id: "e6",
            type: "text",
            content: "Как исправить",
            x: 80,
            y: 200,
            width: 920,
            height: 80,
            zIndex: 1,
          },
          {
            id: "e7",
            type: "text",
            content: "• История → ценность → оффер",
            x: 80,
            y: 320,
            width: 920,
            height: 120,
            zIndex: 2,
          },
        ],
      },
      {
        id: "s5",
        layout: "cta",
        role: "cta",
        background: { type: "color", value: style.tokens.colors.accent },
        elements: [
          {
            id: "e8",
            type: "text",
            content: "Напиши «КАРУСЕЛЬ» в бот",
            x: 80,
            y: 520,
            width: 920,
            height: 160,
            zIndex: 1,
          },
        ],
        animation: { in: "fade", out: "none" },
      },
    ],
  };
}

export const mistakesSquare = mistakesBase("square", "square");
export const mistakesPortrait = mistakesBase("portrait", "portrait");
export const mistakesStory = mistakesBase("story", "story");

export const mistakesFixtures = [
  mistakesSquare,
  mistakesPortrait,
  mistakesStory,
] as const;
