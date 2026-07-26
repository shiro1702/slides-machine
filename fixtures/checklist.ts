import type { ProjectInput } from "@/lib/schemas";
import { getStyle } from "@/lib/meta";
import type { ThemeId } from "@/lib/meta/types";

function checklistBase(
  format: ProjectInput["format"],
  themeId: ThemeId,
  idSuffix: string,
): ProjectInput {
  const style = getStyle(themeId)!;
  const bg = style.tokens.colors.background;
  const surface = style.tokens.colors.surface ?? bg;

  return {
    id: `fixture-checklist-${idSuffix}`,
    type: "carousel",
    title: "Чеклист риелтора перед показом",
    status: "draft",
    themeId,
    templateId: "checklist",
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
            content: "НЕДВИЖИМОСТЬ",
            x: 80,
            y: 360,
            width: 320,
            height: 56,
            zIndex: 2,
          },
          {
            id: "e2",
            type: "text",
            content: "Чеклист риелтора перед показом",
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
        layout: "checklist",
        role: "checklist_item",
        background: { type: "color", value: surface },
        elements: [
          {
            id: "e3",
            type: "text",
            content: "До прихода клиента",
            x: 80,
            y: 200,
            width: 920,
            height: 80,
            zIndex: 1,
          },
          {
            id: "e4",
            type: "text",
            content:
              "• Свет и запах\n• Документы под рукой\n• Маршрут от подъезда",
            x: 80,
            y: 320,
            width: 920,
            height: 360,
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
            content: "Во время показа",
            x: 80,
            y: 200,
            width: 920,
            height: 80,
            zIndex: 1,
          },
          {
            id: "e6",
            type: "text",
            content: "• Не торопи\n• Спроси приоритеты\n• Зафиксируй возражения",
            x: 80,
            y: 320,
            width: 920,
            height: 360,
            zIndex: 2,
          },
        ],
      },
      {
        id: "s4",
        layout: "text_only",
        role: "summary",
        background: { type: "color", value: surface },
        elements: [
          {
            id: "e7",
            type: "text",
            content: "Итог: спокойный показ = больше доверия",
            x: 80,
            y: 480,
            width: 920,
            height: 200,
            zIndex: 1,
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
            content: "Сохрани чеклист себе",
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

export const checklistPortrait = checklistBase(
  "portrait",
  "premium_realestate",
  "portrait",
);
export const checklistMinimal = checklistBase(
  "portrait",
  "expert_minimal",
  "minimal",
);
export const checklistBright = checklistBase(
  "portrait",
  "bright_marketing",
  "bright",
);

export const checklistFixtures = [
  checklistPortrait,
  checklistMinimal,
  checklistBright,
] as const;
