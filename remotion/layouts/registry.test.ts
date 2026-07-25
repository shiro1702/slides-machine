import { describe, expect, it } from "vitest";
import { parseProject } from "@/lib/schemas";
import { mistakesPortrait } from "@/fixtures/mistakes";
import { expertListFixtures } from "@/fixtures/expert-list";
import { checklistFixtures } from "@/fixtures/checklist";
import { assertKnownLayout } from "@/remotion/layouts/assert-layout";

describe("slide fixtures + layouts", () => {
  it("validates mistakes / expert_list / checklist fixtures", () => {
    const all = [
      mistakesPortrait,
      ...expertListFixtures,
      ...checklistFixtures,
    ];
    for (const fixture of all) {
      const project = parseProject(fixture);
      expect(project.scenes.length).toBeGreaterThanOrEqual(3);
      for (const scene of project.scenes) {
        expect(() => assertKnownLayout(scene.layout)).not.toThrow();
      }
    }
  });

  it("rejects unknown layout id", () => {
    expect(() => assertKnownLayout("not_a_real_layout")).toThrow(
      /Unknown layout/,
    );
  });
});
