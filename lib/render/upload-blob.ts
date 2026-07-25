import { put } from "@vercel/blob";
import type { JobResult } from "@/lib/db/schema";
import type { RenderProjectResult } from "./types";

export type UploadedRender = {
  result: JobResult;
};

/**
 * Upload PNG slides + manifest to Vercel Blob.
 * Path: projects/{projectId}/renders/{jobId}/…
 */
export async function uploadRenderToBlob(params: {
  projectId: string;
  jobId: string;
  render: RenderProjectResult;
}): Promise<UploadedRender> {
  const prefix = `projects/${params.projectId}/renders/${params.jobId}`;
  const slides: NonNullable<JobResult["slides"]> = [];

  for (const slide of params.render.slides) {
    const pathname = `${prefix}/${slide.filename}`;
    const blob = await put(pathname, slide.bytes, {
      access: "public",
      addRandomSuffix: false,
      contentType: slide.contentType,
    });
    slides.push({
      sceneId: slide.sceneId,
      filename: slide.filename,
      pathname: blob.pathname,
      url: blob.url,
      width: slide.width,
      height: slide.height,
      bytes: slide.bytes.byteLength,
      contentType: slide.contentType,
    });
  }

  const manifestBody = JSON.stringify(
    {
      ...params.render.manifest,
      slides: slides.map((s) => ({
        sceneId: s.sceneId,
        filename: s.filename,
        pathname: s.pathname,
        url: s.url,
        width: s.width,
        height: s.height,
        bytes: s.bytes,
        contentType: s.contentType,
      })),
    },
    null,
    2,
  );

  const manifestPath = `${prefix}/manifest.json`;
  const manifestBlob = await put(manifestPath, manifestBody, {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  return {
    result: {
      slides,
      manifestPathname: manifestBlob.pathname,
      manifestUrl: manifestBlob.url,
      renderMs: params.render.renderMs,
    },
  };
}
