export const FORMAT_IDS = ["square", "portrait", "story"] as const;

export type FormatId = (typeof FORMAT_IDS)[number];

/** Canonical pixel sizes — never accept arbitrary width/height from clients. */
export const FORMAT_DIMENSIONS: Record<
  FormatId,
  { width: number; height: number; label: string }
> = {
  square: { width: 1080, height: 1080, label: "1:1" },
  portrait: { width: 1080, height: 1350, label: "4:5" },
  story: { width: 1080, height: 1920, label: "9:16" },
};

export function dimensionsForFormat(format: FormatId) {
  return FORMAT_DIMENSIONS[format];
}
