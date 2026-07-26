import type { ProjectInput } from "@/lib/schemas";
import { getStyle } from "@/lib/meta";
import type { ThemeId } from "@/lib/meta/types";

function expertListBase(
  format: ProjectInput["format"],
  themeId: ThemeId,
  idSuffix: string,
): ProjectInput {
  const style = getStyle(themeId)!;
  const bg = style.tokens.colors.background;
  const surface = style.tokens.colors.surface ?? bg;

  return {
    id: `fixture-expert-list-${idSuffix}`,
    type: "carousel",
    title: "7 правил сильного экспертного контента",
    status: "draft",
    themeId,
    templateId: "expert_list",
    format,
    theme: style.tokens,
    exportSettings: {
      type: "telegram_album",
      quality: "standard",
      includeWatermark: false,
    },
    scenes: [
      {
        id: "s1",
        layout: "cover_center",
        role: "cover",
        background: { type: "color", value: bg },
        elements: [
          {
            id: "e1",
            type: "badge",
            content: "ЭКСПЕРТ",
            x: 80,
            y: 360,
            width: 240,
            height: 56,
            zIndex: 2,
          },
          {
            id: "e2",
            type: "text",
            content: "7 правил сильного экспертного контента",
            x: 80,
            y: 480,
            width: 920,
            height: 240,
            zIndex: 1,
          },
        ],
      },
      {
        id: "s2",
        layout: "text_big_number",
        role: "point",
        background: { type: "color", value: surface },
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
            content: "Одна мысль — один слайд",
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
        layout: "checklist",
        role: "checklist_item",
        background: { type: "color", value: bg },
        elements: [
          {
            id: "e5",
            type: "text",
            content: "Чеклист перед публикацией",
            x: 80,
            y: 200,
            width: 920,
            height: 80,
            zIndex: 1,
          },
          {
            id: "e6",
            type: "text",
            content: "• Заголовок до 8 слов\n• Польза в первых 2 строках\n• CTA без воды",
            x: 80,
            y: 320,
            width: 920,
            height: 320,
            zIndex: 2,
          },
        ],
      },
      {
        id: "s4",
        layout: "text_image_right",
        role: "point",
        background: { type: "color", value: surface },
        elements: [
          {
            id: "e7",
            type: "text",
            content: "Покажи процесс, не только результат",
            x: 80,
            y: 400,
            width: 480,
            height: 200,
            zIndex: 1,
          },
          {
            id: "e8",
            type: "image",
            content: "",
            x: 0,
            y: 0,
            width: 400,
            height: 600,
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
            id: "e9",
            type: "text",
            content: "Сохрани и сделай свою карусель",
            x: 80,
            y: 520,
            width: 920,
            height: 160,
            zIndex: 1,
          },
        ],
      },
    ],
  };
}

export const expertListPortrait = expertListBase(
  "portrait",
  "expert_minimal",
  "portrait",
);
export const expertListBright = expertListBase(
  "portrait",
  "bright_marketing",
  "bright",
);
export const expertListPremium = expertListBase(
  "portrait",
  "premium_realestate",
  "premium",
);

export const expertListFixtures = [
  expertListPortrait,
  expertListBright,
  expertListPremium,
] as const;
