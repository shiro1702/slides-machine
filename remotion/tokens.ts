/** Shared layout tokens for 1080×1350 (and scaled formats). */

export const SAFE_AREA = {
  top: 80,
  right: 80,
  bottom: 100,
  left: 80,
} as const;

export const TYPOGRAPHY = {
  coverTitle: { fontSize: 72, lineHeight: 1.1, fontWeight: 700 },
  title: { fontSize: 56, lineHeight: 1.15, fontWeight: 700 },
  body: { fontSize: 36, lineHeight: 1.4, fontWeight: 400 },
  bigNumber: { fontSize: 120, lineHeight: 1, fontWeight: 700 },
  badge: { fontSize: 28, lineHeight: 1.2, fontWeight: 700, letterSpacing: 2 },
  cta: { fontSize: 48, lineHeight: 1.2, fontWeight: 700 },
  checklist: { fontSize: 40, lineHeight: 1.45, fontWeight: 500 },
} as const;

/**
 * Font stacks with Cyrillic-capable fallbacks.
 * Remotion Chromium loads system + these CSS stacks consistently.
 */
export const FONT_STACKS = {
  expert_minimal: {
    display: '"Source Serif 4", "Noto Serif", Georgia, serif',
    body: '"Source Sans 3", "Noto Sans", "Helvetica Neue", sans-serif',
  },
  bright_marketing: {
    display: '"Montserrat", "Noto Sans", "Arial Black", sans-serif',
    body: '"Open Sans", "Noto Sans", Arial, sans-serif',
  },
  premium_realestate: {
    display: '"Cormorant Garamond", "Noto Serif", Palatino, serif',
    body: '"Lato", "Noto Sans", Optima, sans-serif',
  },
} as const;
