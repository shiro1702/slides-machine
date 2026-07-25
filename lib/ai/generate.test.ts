import { describe, expect, it } from "vitest";
import { parseCallbackData } from "@/lib/telegram/callbacks";
import { isFlowExpired, FLOW_TTL_MS } from "@/lib/telegram/flow-steps";
import {
  generateCarouselProject,
  normalizeLlmJsonText,
  parseProjectFromLlmText,
  resolveLlmMode,
} from "@/lib/ai";
import { getNiche, getStyle, getTemplate, templateForNiche } from "@/lib/meta";
import { NICHE_IDS } from "@/lib/schemas/enums";
import { buildFixtureProject } from "@/lib/ai/fixture";
import { parseProject, safeParseProject } from "@/lib/schemas";

describe("parseCallbackData", () => {
  it("parses known actions and niche/style ids", () => {
    expect(parseCallbackData("new_carousel")).toEqual({ type: "new_carousel" });
    expect(parseCallbackData("n:experts")).toEqual({
      type: "niche",
      nicheId: "experts",
    });
    expect(parseCallbackData("s:expert_minimal")).toEqual({
      type: "style",
      styleId: "expert_minimal",
    });
    expect(parseCallbackData("n:hacker").type).toBe("unknown");
  });
});

describe("flow expiry", () => {
  it("expires after TTL", () => {
    const old = new Date(Date.now() - FLOW_TTL_MS - 1000);
    expect(isFlowExpired(old)).toBe(true);
    expect(isFlowExpired(new Date())).toBe(false);
  });
});

describe("resolveLlmMode", () => {
  it("defaults to fixture without key", () => {
    expect(resolveLlmMode({} as NodeJS.ProcessEnv)).toBe("fixture");
    expect(resolveLlmMode({ GROQ_API_KEY: "x" } as NodeJS.ProcessEnv)).toBe(
      "groq",
    );
    expect(
      resolveLlmMode({
        LLM_MODE: "fixture",
        GROQ_API_KEY: "x",
      } as NodeJS.ProcessEnv),
    ).toBe("fixture");
  });
});

describe("normalizeLlmJsonText", () => {
  it("strips fences and prose", () => {
    const raw = 'Here:\n```json\n{"a":1}\n```\n';
    expect(normalizeLlmJsonText(raw)).toBe('{"a":1}');
  });
});

describe("fixture generation for all niches", () => {
  it.each([...NICHE_IDS])("valid project for niche %s", async (nicheId) => {
    const niche = getNiche(nicheId)!;
    const style = getStyle("expert_minimal")!;
    const template = getTemplate(templateForNiche(nicheId))!;

    const { project, mode } = await generateCarouselProject(
      {
        topic: "5 ошибок в прогреве перед продажей",
        niche,
        style,
        template,
        format: "portrait",
        projectId: `test-${nicheId}`,
      },
      { mode: "fixture" },
    );

    expect(mode).toBe("fixture");
    expect(project.scenes.length).toBeGreaterThanOrEqual(1);
    expect(project.scenes.some((s) => s.role === "cta" || s.layout === "cta")).toBe(
      true,
    );
    const coverish = project.scenes[0];
    expect(coverish.elements.length).toBeGreaterThan(0);
  });

  it("handles cyrillic, long topic, and unsafe-looking input", () => {
    const niche = getNiche("smm")!;
    const style = getStyle("bright_marketing")!;
    const template = getTemplate(templateForNiche("smm"))!;
    const topic =
      "Как сделать контент-план на неделю без выгорания: чеклист для команды SMM " +
      "и <script>alert(1)</script> DROP TABLE users; очень-очень длинная тема ".repeat(
        3,
      );

    const input = buildFixtureProject({
      topic,
      niche,
      style,
      template,
      format: "square",
      projectId: "fixture-long",
    });
    const parsed = safeParseProject(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.title.length).toBeGreaterThan(0);
      expect(parsed.data.scenes[0].role).toBe("cover");
    }
  });
});

describe("parseProjectFromLlmText", () => {
  it("rejects invalid json", () => {
    expect(() => parseProjectFromLlmText("not json")).toThrow();
  });

  it("accepts fixture-shaped json with fences", () => {
    const niche = getNiche("realestate")!;
    const style = getStyle("premium_realestate")!;
    const template = getTemplate(templateForNiche("realestate"))!;
    const project = parseProject(
      buildFixtureProject({
        topic: "Что проверить перед задатком",
        niche,
        style,
        template,
        format: "portrait",
        projectId: "llm-text",
      }),
    );
    const raw = "```json\n" + JSON.stringify(project) + "\n```";
    const parsed = parseProjectFromLlmText(raw);
    expect(parsed.id).toBe("llm-text");
  });
});
