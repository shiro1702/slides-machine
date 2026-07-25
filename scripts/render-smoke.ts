/**
 * Offline PNG smoke: fixtures → PNG files + manifest.
 * Uses RENDER_BACKEND=layout by default for CI without Chromium.
 *
 *   npm run render:smoke
 */
import fs from "node:fs/promises";
import path from "node:path";
import { mistakesPortrait } from "../fixtures/mistakes";
import { expertListPortrait } from "../fixtures/expert-list";
import { checklistPortrait } from "../fixtures/checklist";
import { renderProjectPngs } from "../lib/render";

async function main() {
  process.env.RENDER_BACKEND = process.env.RENDER_BACKEND ?? "layout";

  const outRoot = path.join(process.cwd(), ".tmp", "render-smoke");
  await fs.rm(outRoot, { recursive: true, force: true });
  await fs.mkdir(outRoot, { recursive: true });

  const fixtures = [
    { name: "mistakes", project: mistakesPortrait },
    { name: "expert_list", project: expertListPortrait },
    { name: "checklist", project: checklistPortrait },
  ];

  for (const fixture of fixtures) {
    const result = await renderProjectPngs({
      ...fixture.project,
      id: `smoke-${fixture.name}`,
    });
    const dir = path.join(outRoot, fixture.name);
    await fs.mkdir(dir, { recursive: true });

    for (const slide of result.slides) {
      await fs.writeFile(path.join(dir, slide.filename), slide.bytes);
      if (slide.width !== 1080 || slide.height !== 1350) {
        throw new Error(
          `${fixture.name}/${slide.filename} unexpected size ${slide.width}x${slide.height}`,
        );
      }
    }
    await fs.writeFile(
      path.join(dir, "manifest.json"),
      JSON.stringify(result.manifest, null, 2),
    );
    console.log(
      `OK ${fixture.name}: ${result.slides.length} pngs in ${result.renderMs}ms`,
    );
  }

  console.log(`Wrote ${outRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
