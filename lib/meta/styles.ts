import type { ThemeTokens } from "@/lib/schemas";
import type { ThemeId } from "./types";

export type StyleMeta = {
  id: ThemeId;
  slug: ThemeId;
  label: string;
  description: string;
  tokens: ThemeTokens;
};

export const styles: StyleMeta[] = [
  {
    id: "expert_minimal",
    slug: "expert_minimal",
    label: "Экспертный минимализм",
    description: "Тёмный фон, жёлтый акцент, много воздуха",
    tokens: {
      colors: {
        background: "#0B0B0B",
        foreground: "#F5F5F5",
        accent: "#F5C518",
        muted: "#8A8A8A",
        surface: "#1A1A1A",
      },
      fonts: {
        display: "Georgia, serif",
        body: "Helvetica Neue, sans-serif",
      },
      radii: { sm: 4, md: 8, lg: 16 },
      cta: { background: "#F5C518", foreground: "#0B0B0B" },
    },
  },
  {
    id: "bright_marketing",
    slug: "bright_marketing",
    label: "Яркий маркетинг",
    description: "Светлый фон, насыщенный акцент, плотная типографика",
    tokens: {
      colors: {
        background: "#FFF8F0",
        foreground: "#1A1028",
        accent: "#FF3D6E",
        muted: "#6B5A70",
        surface: "#FFFFFF",
      },
      fonts: {
        display: "Impact, sans-serif",
        body: "Arial, sans-serif",
      },
      radii: { sm: 6, md: 12, lg: 24 },
      cta: { background: "#FF3D6E", foreground: "#FFFFFF" },
    },
  },
  {
    id: "premium_realestate",
    slug: "premium_realestate",
    label: "Премиум-недвижимость",
    description: "Тёплый беж, глубокий зелёный, спокойная иерархия",
    tokens: {
      colors: {
        background: "#F3EDE4",
        foreground: "#1C2A24",
        accent: "#2F5D50",
        muted: "#7A6F63",
        surface: "#FAF7F2",
      },
      fonts: {
        display: "Palatino, serif",
        body: "Optima, sans-serif",
      },
      radii: { sm: 2, md: 6, lg: 12 },
      cta: { background: "#2F5D50", foreground: "#F3EDE4" },
    },
  },
];

export function getStyle(id: ThemeId): StyleMeta | undefined {
  return styles.find((s) => s.id === id);
}
