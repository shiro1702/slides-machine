import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Project, Scene, ThemeTokens } from "@/lib/schemas";
import {
  prepareProjectForRender,
  slideFilename,
  type RenderManifest,
  type RenderProjectResult,
  type RenderSlideOutput,
} from "./types";

export type RenderBackend = "remotion" | "layout";

function resolveBackend(): RenderBackend {
  const env = process.env.RENDER_BACKEND;
  if (env === "layout" || env === "remotion") return env;
  if (process.env.RENDER_SKIP_CHROMIUM === "1") return "layout";
  // Prefer SVG/sharp on Vercel serverless (Chromium cold start is heavy)
  if (process.env.VERCEL) return "layout";
  return "remotion";
}

function themeOf(project: Project): ThemeTokens {
  return project.theme!;
}

async function renderSlideLayout(
  project: Project,
  scene: Scene,
  index: number,
): Promise<RenderSlideOutput> {
  const { renderSceneSvgPng } = await import("./svg-png");
  const bytes = await renderSceneSvgPng({ project, scene });

  return {
    sceneId: scene.id,
    index,
    filename: slideFilename(index),
    width: project.width,
    height: project.height,
    contentType: "image/png",
    bytes,
  };
}

async function renderSlideRemotion(
  project: Project,
  scene: Scene,
  index: number,
  bundleLocation: string,
): Promise<RenderSlideOutput> {
  const { renderStill, selectComposition } = await import(
    "@remotion/renderer"
  );

  const compositionId =
    project.format === "square"
      ? "CarouselSlideSquare"
      : project.format === "story"
        ? "CarouselSlideStory"
        : "CarouselSlide";

  const inputProps = {
    scene,
    theme: themeOf(project),
    width: project.width,
    height: project.height,
  };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    inputProps,
  });

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "slides-png-"));
  const outPath = path.join(tmpDir, slideFilename(index));

  try {
    const chromiumOptions: {
      executablePath?: string;
      args?: string[];
    } = {};

    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      const chromium = (await import("@sparticuz/chromium")).default;
      chromiumOptions.executablePath = await chromium.executablePath();
      chromiumOptions.args = chromium.args;
    }

    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: outPath,
      inputProps,
      imageFormat: "png",
      browserExecutable: chromiumOptions.executablePath,
      chromiumOptions: chromiumOptions.args
        ? { enableMultiProcessOnLinux: true }
        : undefined,
      timeoutInMilliseconds: 120_000,
    });

    const bytes = await fs.readFile(outPath);
    return {
      sceneId: scene.id,
      index,
      filename: slideFilename(index),
      width: project.width,
      height: project.height,
      contentType: "image/png",
      bytes,
    };
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => undefined);
  }
}

let bundlePromise: Promise<string> | null = null;

async function getRemotionBundle(): Promise<string> {
  if (!bundlePromise) {
    bundlePromise = (async () => {
      const { bundle } = await import("@remotion/bundler");
      const entryPoint = path.join(process.cwd(), "remotion", "index.ts");
      return bundle({
        entryPoint,
        webpackOverride: (config) => config,
      });
    })().catch((error) => {
      bundlePromise = null;
      throw error;
    });
  }
  return bundlePromise;
}

/**
 * Render all scenes to PNG. Re-validates JSON; fails the whole set on any scene error.
 */
export async function renderProjectPngs(
  rawProject: unknown,
): Promise<RenderProjectResult> {
  const started = Date.now();
  const project = prepareProjectForRender(rawProject);
  const backend = resolveBackend();
  const slides: RenderSlideOutput[] = [];

  let bundleLocation: string | null = null;
  if (backend === "remotion") {
    try {
      bundleLocation = await getRemotionBundle();
    } catch (error) {
      console.warn(
        JSON.stringify({
          type: "render",
          event: "remotion_bundle_failed",
          message: error instanceof Error ? error.message : "bundle failed",
        }),
      );
    }
  }

  for (let i = 0; i < project.scenes.length; i++) {
    const scene = project.scenes[i]!;
    try {
      if (backend === "remotion" && bundleLocation) {
        try {
          slides.push(
            await renderSlideRemotion(project, scene, i, bundleLocation),
          );
          continue;
        } catch (error) {
          console.warn(
            JSON.stringify({
              type: "render",
              event: "remotion_slide_failed",
              sceneId: scene.id,
              message: error instanceof Error ? error.message : "render failed",
            }),
          );
          // Fall through to layout backend for this environment
        }
      }
      slides.push(await renderSlideLayout(project, scene, i));
    } catch (error) {
      const message = error instanceof Error ? error.message : "scene render failed";
      throw new Error(`Scene ${scene.id} render failed: ${message}`);
    }
  }

  const renderMs = Date.now() - started;
  const mem = process.memoryUsage();

  console.log(
    JSON.stringify({
      type: "telemetry",
      event: "render_completed",
      projectId: project.id,
      sceneCount: slides.length,
      renderMs,
      rssMb: Math.round(mem.rss / 1024 / 1024),
      heapMb: Math.round(mem.heapUsed / 1024 / 1024),
      backend: bundleLocation ? backend : "layout",
    }),
  );

  const manifest: RenderManifest = {
    projectId: project.id,
    format: project.format,
    width: project.width,
    height: project.height,
    renderMs,
    slides: slides.map((s) => ({
      sceneId: s.sceneId,
      index: s.index,
      filename: s.filename,
      width: s.width,
      height: s.height,
      contentType: s.contentType,
      bytes: s.bytes.byteLength,
    })),
  };

  return { project, slides, manifest, renderMs };
}

export { prepareProjectForRender, slideFilename };
export type { RenderManifest, RenderProjectResult, RenderSlideOutput };
