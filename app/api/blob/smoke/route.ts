import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

/**
 * Smoke: upload a tiny object then delete it.
 * Requires BLOB_READ_WRITE_TOKEN.
 */
export async function POST() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "BLOB_READ_WRITE_TOKEN is not set" },
      { status: 503 },
    );
  }

  const pathname = `smoke/sprint0-${Date.now()}.txt`;

  try {
    const blob = await put(pathname, "slides-machine blob smoke", {
      access: "public",
      addRandomSuffix: true,
      contentType: "text/plain",
    });

    await del(blob.url);

    return NextResponse.json({
      ok: true,
      uploaded: true,
      deleted: true,
      pathname: blob.pathname,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "blob smoke failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
