import type { NicheId } from "./types";

export type NicheMeta = {
  id: NicheId;
  slug: NicheId;
  label: string;
  audience: string;
  tone: string;
  contentGoals: string[];
};

export const niches: NicheMeta[] = [
  {
    id: "experts",
    slug: "experts",
    label: "Эксперты / коучи",
    audience: "Консультанты, коучи, эксперты с личным брендом",
    tone: "Авторитетный, ясный, без воды; личный опыт и выводы",
    contentGoals: [
      "привлечь лиды на консультацию",
      "показать экспертизу",
      "разобрать ошибки аудитории",
    ],
  },
  {
    id: "realestate",
    slug: "realestate",
    label: "Недвижимость",
    audience: "Риелторы и агентства (пилот: Улан-Удэ → RU)",
    tone: "Премиальный, спокойный, доверительный",
    contentGoals: [
      "показать объекты и районы",
      "закрыть возражения покупателей",
      "собрать заявки на просмотр",
    ],
  },
  {
    id: "smm",
    slug: "smm",
    label: "SMM / контент",
    audience: "SMM-менеджеры и контент-команды",
    tone: "Прямой, практичный, с чеклистами и шаблонами",
    contentGoals: [
      "ускорить выпуск каруселей",
      "закрыть контент-план",
      "показать клиенту варианты стиля",
    ],
  },
];

export function getNiche(id: NicheId): NicheMeta | undefined {
  return niches.find((n) => n.id === id);
}
