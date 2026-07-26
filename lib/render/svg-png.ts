import sharp from "sharp";
import type { Project, Scene, ThemeTokens } from "@/lib/schemas";
import { elementText } from "@/remotion/layouts/element-text";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bgColor(scene: Scene, theme: ThemeTokens): string {
  if (scene.background.type === "color") return scene.background.value;
  return theme.colors.background;
}

function fontSizeFor(scene: Scene, elIndex: number, elZ: number): number {
  if (scene.layout === "cover_center") return 64;
  if (scene.layout === "text_big_number" && elZ === 1) return 112;
  if (scene.layout === "cta") return 48;
  if (scene.layout === "checklist") return elZ === 1 ? 44 : 36;
  return elZ === 1 ? 52 : 34;
}

/**
 * Deterministic SVG→PNG render (Cyrillic via DejaVu/Noto in sharp/librsvg).
 * Used when Remotion/Chromium is unavailable.
 */
export async function renderSceneSvgPng(params: {
  project: Project;
  scene: Scene;
}): Promise<Buffer> {
  const { project, scene } = params;
  const theme = project.theme!;
  const bg = bgColor(scene, theme);
  const width = project.width;
  const height = project.height;

  const elements = [...scene.elements].sort((a, b) => a.zIndex - b.zIndex);
  const nodes: string[] = [];

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]!;
    const text = elementText(el);
    if (el.type === "badge") {
      nodes.push(
        `<rect x="${el.x}" y="${el.y}" width="${Math.min(el.width, 360)}" height="${el.height}" rx="${theme.radii.sm}" fill="${theme.colors.accent}"/>`,
        `<text x="${el.x + 20}" y="${el.y + el.height * 0.68}" font-family="${escapeXml(theme.fonts.body)}" font-size="26" font-weight="700" fill="${theme.cta?.foreground ?? theme.colors.background}">${escapeXml(text)}</text>`,
      );
      continue;
    }
    if (el.type === "image") {
      nodes.push(
        `<rect x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" rx="${theme.radii.md}" fill="${theme.colors.surface ?? theme.colors.muted ?? "#444"}"/>`,
      );
      continue;
    }

    const fill =
      scene.layout === "cta"
        ? (theme.cta?.foreground ?? theme.colors.background)
        : theme.colors.foreground;
    const fontFamily =
      el.zIndex === 1 || scene.layout === "cover_center"
        ? theme.fonts.display
        : theme.fonts.body;
    const fontSize = fontSizeFor(scene, i, el.zIndex);
    const lines = text.split("\n");
    lines.forEach((line, lineIdx) => {
      const y = el.y + fontSize + lineIdx * (fontSize * 1.35);
      nodes.push(
        `<text x="${el.x}" y="${y}" font-family="${escapeXml(fontFamily)}" font-size="${fontSize}" font-weight="${el.zIndex === 1 ? 700 : 500}" fill="${fill}">${escapeXml(line.slice(0, 80))}</text>`,
      );
    });
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  ${nodes.join("\n  ")}
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
