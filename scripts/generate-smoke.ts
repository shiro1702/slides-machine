import "dotenv/config";
import { generateCarouselProject, resolveLlmMode } from "../lib/ai";
import { getNiche, getStyle, getTemplate, templateForNiche } from "../lib/meta";
import { NICHE_IDS } from "../lib/schemas/enums";
import { safeParseProject } from "../lib/schemas";

async function main() {
  const mode = resolveLlmMode();
  const results: Array<{ nicheId: string; ok: boolean; title?: string }> = [];

  for (const nicheId of NICHE_IDS) {
    const niche = getNiche(nicheId)!;
    const style = getStyle("expert_minimal")!;
    const template = getTemplate(templateForNiche(nicheId))!;
    const topics: Record<string, string> = {
      experts: "3 мифа о личном бренде эксперта",
      realestate: "Что проверить перед задатком в Улан-Удэ",
      smm: "Чеклист карусели за 15 минут",
    };

    const { project } = await generateCarouselProject({
      topic: topics[nicheId] ?? "Тема карусели",
      niche,
      style,
      template,
      format: "portrait",
      projectId: `smoke-gen-${nicheId}`,
    });

    const parsed = safeParseProject(project);
    results.push({
      nicheId,
      ok: parsed.success,
      title: parsed.success ? parsed.data.title : undefined,
    });
    if (!parsed.success) {
      throw new Error(`Invalid project for ${nicheId}`);
    }
  }

  console.log(JSON.stringify({ ok: true, mode, results }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
