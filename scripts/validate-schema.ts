import { mistakesFixtures } from "../fixtures/mistakes";
import { FORMAT_DIMENSIONS, parseProject, safeParseProject } from "../lib/schemas";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  for (const fixture of mistakesFixtures) {
    const project = parseProject(fixture);
    const dims = FORMAT_DIMENSIONS[fixture.format];
    assert(project.width === dims.width, `width mismatch for ${fixture.format}`);
    assert(project.height === dims.height, `height mismatch for ${fixture.format}`);
    assert(project.templateId === "mistakes", "templateId");
    assert(project.themeId === "expert_minimal", "themeId");
    console.log(`ok: mistakes ${fixture.format} → ${project.width}×${project.height}`);
  }

  const invalidFormat = safeParseProject({
    ...mistakesFixtures[0],
    format: "ultrawide",
  });
  assert(!invalidFormat.success, "invalid format should fail");

  const invalidLayout = safeParseProject({
    ...mistakesFixtures[0],
    scenes: [
      {
        ...mistakesFixtures[0].scenes[0],
        layout: "not_a_layout",
      },
    ],
  });
  assert(!invalidLayout.success, "invalid layout should fail");

  const invalidElement = safeParseProject({
    ...mistakesFixtures[0],
    scenes: [
      {
        ...mistakesFixtures[0].scenes[0],
        elements: [
          {
            id: "bad",
            type: "widget",
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            zIndex: 1,
          },
        ],
      },
    ],
  });
  assert(!invalidElement.success, "invalid element type should fail");

  console.log("ok: invalid format/layout/element rejected");
  console.log("All schema fixtures passed.");
}

main();
