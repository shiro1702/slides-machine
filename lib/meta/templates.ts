import type { TemplateId } from "./types";

export type SlideRole =
  | "cover"
  | "point"
  | "mistake"
  | "fix"
  | "problem"
  | "why"
  | "solution"
  | "example"
  | "myth"
  | "truth"
  | "checklist_item"
  | "summary"
  | "before"
  | "after"
  | "result"
  | "cta";

export type TemplateMeta = {
  id: TemplateId;
  slug: TemplateId;
  label: string;
  purpose: string;
  slideRoles: SlideRole[];
};

export const templates: TemplateMeta[] = [
  {
    id: "expert_list",
    slug: "expert_list",
    label: "Expert List",
    purpose: "Список экспертных пунктов с обложкой и CTA",
    slideRoles: ["cover", "point", "point", "point", "checklist_item", "cta"],
  },
  {
    id: "mistakes",
    slug: "mistakes",
    label: "Mistakes",
    purpose: "Типичные ошибки → как исправить → призыв к действию",
    slideRoles: ["cover", "mistake", "mistake", "mistake", "fix", "cta"],
  },
  {
    id: "problem_solution",
    slug: "problem_solution",
    label: "Problem Solution",
    purpose: "Проблема → почему → решение → пример → CTA",
    slideRoles: ["problem", "why", "solution", "example", "cta"],
  },
  {
    id: "myth_truth",
    slug: "myth_truth",
    label: "Myth / Truth",
    purpose: "Миф → правда → пример → вывод → CTA",
    slideRoles: ["myth", "truth", "example", "summary", "cta"],
  },
  {
    id: "checklist",
    slug: "checklist",
    label: "Checklist",
    purpose: "Обложка → чеки → итог → CTA",
    slideRoles: ["cover", "checklist_item", "checklist_item", "summary", "cta"],
  },
  {
    id: "case_study",
    slug: "case_study",
    label: "Case Study",
    purpose: "Было → сделали → результат → повторить → CTA",
    slideRoles: ["before", "solution", "result", "summary", "cta"],
  },
  {
    id: "before_after",
    slug: "before_after",
    label: "Before After",
    purpose: "Контраст до/после с коротким выводом",
    slideRoles: ["before", "after", "result", "cta"],
  },
];

export function getTemplate(id: TemplateId): TemplateMeta | undefined {
  return templates.find((t) => t.id === id);
}
