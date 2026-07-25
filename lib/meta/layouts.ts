import { LAYOUT_IDS } from "@/lib/schemas";

export type LayoutMeta = {
  id: (typeof LAYOUT_IDS)[number];
  label: string;
  category: "basic" | "image";
};

export const layouts: LayoutMeta[] = [
  { id: "cover_center", label: "Cover center", category: "basic" },
  { id: "text_only", label: "Text only", category: "basic" },
  { id: "text_big_number", label: "Big number", category: "basic" },
  { id: "text_with_badge", label: "Text with badge", category: "basic" },
  { id: "quote", label: "Quote", category: "basic" },
  { id: "checklist", label: "Checklist", category: "basic" },
  { id: "cta", label: "CTA", category: "basic" },
  { id: "text_image_right", label: "Text + image right", category: "image" },
  { id: "text_image_left", label: "Text + image left", category: "image" },
  {
    id: "image_background_dark_overlay",
    label: "Image + dark overlay",
    category: "image",
  },
  {
    id: "image_top_text_bottom",
    label: "Image top / text bottom",
    category: "image",
  },
  {
    id: "image_bottom_text_top",
    label: "Image bottom / text top",
    category: "image",
  },
];
