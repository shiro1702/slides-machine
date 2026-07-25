import type { NicheId, TemplateId } from "./types";

/** Deterministic template pick — no extra user question in Sprint 1. */
const NICHE_TEMPLATE: Record<NicheId, TemplateId> = {
  experts: "mistakes",
  realestate: "checklist",
  smm: "expert_list",
};

export function templateForNiche(nicheId: NicheId): TemplateId {
  return NICHE_TEMPLATE[nicheId];
}
