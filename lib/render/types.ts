import { parseProject, type Project } from "@/lib/schemas";
import { getStyle } from "@/lib/meta";
import { assertKnownLayout } from "@/remotion/layouts/assert-layout";

export type RenderSlideOutput = {
  sceneId: string;
  index: number;
  filename: string;
  width: number;
  height: number;
  contentType: "image/png";
  bytes: Buffer;
};

export type RenderManifest = {
  projectId: string;
  format: Project["format"];
  width: number;
  height: number;
  renderMs: number;
  slides: Array<{
    sceneId: string;
    index: number;
    filename: string;
    width: number;
    height: number;
    contentType: "image/png";
    bytes: number;
  }>;
};

export type RenderProjectResult = {
  project: Project;
  slides: RenderSlideOutput[];
  manifest: RenderManifest;
  renderMs: number;
};

export function prepareProjectForRender(raw: unknown): Project {
  const parsed = parseProject(raw);
  const style = getStyle(parsed.themeId);
  if (!parsed.theme && !style) {
    throw new Error(`Unknown themeId: ${parsed.themeId}`);
  }
  const project: Project = {
    ...parsed,
    theme: parsed.theme ?? style!.tokens,
  };
  for (const scene of project.scenes) {
    assertKnownLayout(scene.layout);
  }
  return project;
}

export function slideFilename(index: number): string {
  return `scene-${String(index + 1).padStart(2, "0")}.png`;
}
