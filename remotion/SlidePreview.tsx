import { AbsoluteFill } from "remotion";
import type { ThemeTokens } from "@/lib/schemas";

export type SlidePreviewProps = {
  title: string;
  subtitle?: string;
  theme: ThemeTokens;
  width: number;
  height: number;
};

/** Minimal Remotion slide stub — real layouts land in Sprint 2. */
export function SlidePreview({
  title,
  subtitle,
  theme,
}: SlidePreviewProps) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.fonts.display,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 32,
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          backgroundColor: theme.colors.accent,
          color: theme.cta?.foreground ?? theme.colors.background,
          padding: "12px 20px",
          borderRadius: theme.radii.sm,
          fontFamily: theme.fonts.body,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        SLIDES
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: 72,
          lineHeight: 1.1,
          fontWeight: 700,
          maxWidth: 900,
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p
          style={{
            margin: 0,
            fontSize: 36,
            lineHeight: 1.4,
            color: theme.colors.muted ?? theme.colors.foreground,
            fontFamily: theme.fonts.body,
            maxWidth: 800,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </AbsoluteFill>
  );
}
