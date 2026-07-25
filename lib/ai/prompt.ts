import type { NicheMeta, StyleMeta, TemplateMeta } from "@/lib/meta";
import type { FormatId } from "@/lib/schemas";

export type GenerateCarouselInput = {
  topic: string;
  niche: NicheMeta;
  style: StyleMeta;
  template: TemplateMeta;
  format: FormatId;
  /** Existing draft project id — reused in output JSON */
  projectId: string;
};

export function buildCarouselPrompt(input: GenerateCarouselInput): string {
  const roles = input.template.slideRoles.join(", ");
  const goals = input.niche.contentGoals.join("; ");

  return `Ты эксперт по созданию вирусных каруселей для соцсетей (VK, Telegram, Instagram*).

Создай структуру карусели на тему: ${input.topic}
Аудитория: ${input.niche.audience}
Тон: ${input.niche.tone}
Ниша: ${input.niche.label}
Цели контента: ${goals}
Шаблон: ${input.template.label} (${input.template.id})
Роли слайдов по порядку: ${roles}
Стиль: ${input.style.label} (${input.style.id})
Формат: ${input.format}

Верни ТОЛЬКО валидный JSON объекта project (без markdown-обёртки).
Требования:
- id = "${input.projectId}"
- type = "carousel"
- status = "draft"
- themeId = "${input.style.id}"
- templateId = "${input.template.id}"
- format = "${input.format}"
- theme = точные токены стиля (colors/fonts/radii/cta) как передано ниже
- title — короткий заголовок проекта на русском
- scenes: по одному на каждую роль шаблона; первый слайд — сильный хук (cover/hook)
- последний слайд — CTA
- каждый scene: id, layout (из разрешённых layout ids), role, background { type: "color", value: hex }, elements[]
- elements: короткие тексты, type text|badge; x/y/width/height/zIndex числа; контент на русском
- exportSettings: { type: "telegram_album", quality: "standard", includeWatermark: false }

Токены темы (используй как есть):
${JSON.stringify(input.style.tokens)}

Тексты короткие, разговорные. Без опасного/запрещённого контента — если тема токсична, сделай нейтральный образовательный вариант.`;
}

/** Strip markdown fences / leading prose before JSON parse. */
export function normalizeLlmJsonText(raw: string): string {
  let text = raw.trim();
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/i.exec(text);
  if (fence) {
    text = fence[1].trim();
  }
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    text = text.slice(firstBrace, lastBrace + 1);
  }
  return text;
}
