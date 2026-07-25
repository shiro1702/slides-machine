import { describe, expect, it } from "vitest";
import { encodeSolidPng } from "./png-encode";
import { prepareProjectForRender, slideFilename } from "./types";
import { mistakesPortrait } from "@/fixtures/mistakes";

describe("png encode", () => {
  it("writes a valid PNG signature", () => {
    const buf = encodeSolidPng({
      width: 8,
      height: 8,
      background: "#0B0B0B",
      blocks: [{ x: 1, y: 1, width: 4, height: 2, color: "#F5C518" }],
    });
    expect(buf[0]).toBe(137);
    expect(buf[1]).toBe(80);
    expect(buf[2]).toBe(78);
    expect(buf[3]).toBe(71);
    expect(buf.byteLength).toBeGreaterThan(50);
  });
});

describe("prepareProjectForRender", () => {
  it("validates and fills theme", () => {
    const project = prepareProjectForRender(mistakesPortrait);
    expect(project.theme).toBeTruthy();
    expect(project.width).toBe(1080);
    expect(project.height).toBe(1350);
    expect(slideFilename(0)).toBe("scene-01.png");
  });
});
