import type { Element, ThemeTokens } from "@/lib/schemas";
import { TYPOGRAPHY } from "../tokens";
import {
  AbsoluteElementBox,
  elementText,
  type LayoutProps,
  SlideShell,
  sortedElements,
} from "./shared";

function renderElement(el: Element, theme: ThemeTokens, layoutHint: string) {
  const text = elementText(el);
  const isCtaBg =
    layoutHint === "cta" &&
    (el.type === "text" || el.type === "badge");

  if (el.type === "badge") {
    return (
      <AbsoluteElementBox key={el.id} el={el}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: theme.colors.accent,
            color: theme.cta?.foreground ?? theme.colors.background,
            padding: "12px 20px",
            borderRadius: theme.radii.sm,
            fontFamily: theme.fonts.body,
            fontSize: TYPOGRAPHY.badge.fontSize,
            fontWeight: TYPOGRAPHY.badge.fontWeight,
            letterSpacing: TYPOGRAPHY.badge.letterSpacing,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {text}
        </div>
      </AbsoluteElementBox>
    );
  }

  if (el.type === "image") {
    const src =
      typeof el.content === "string"
        ? el.content
        : el.content && typeof el.content === "object" && "url" in el.content
          ? String((el.content as { url?: unknown }).url ?? "")
          : "";
    return (
      <AbsoluteElementBox key={el.id} el={el}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: theme.radii.md,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: theme.colors.surface ?? theme.colors.muted,
              borderRadius: theme.radii.md,
            }}
          />
        )}
      </AbsoluteElementBox>
    );
  }

  const fontSize =
    layoutHint === "cover_center"
      ? TYPOGRAPHY.coverTitle.fontSize
      : layoutHint === "text_big_number" && el.zIndex === 1
        ? TYPOGRAPHY.bigNumber.fontSize
        : layoutHint === "cta"
          ? TYPOGRAPHY.cta.fontSize
          : layoutHint === "checklist"
            ? TYPOGRAPHY.checklist.fontSize
            : el.zIndex === 1
              ? TYPOGRAPHY.title.fontSize
              : TYPOGRAPHY.body.fontSize;

  return (
    <AbsoluteElementBox key={el.id} el={el}>
      <div
        style={{
          fontFamily:
            el.zIndex === 1 || layoutHint === "cover_center"
              ? theme.fonts.display
              : theme.fonts.body,
          fontSize,
          lineHeight: 1.2,
          fontWeight: el.zIndex === 1 ? 700 : 500,
          color: isCtaBg
            ? (theme.cta?.foreground ?? theme.colors.background)
            : theme.colors.foreground,
          wordBreak: "break-word",
          maxHeight: "100%",
          overflow: "hidden",
        }}
      >
        {text}
      </div>
    </AbsoluteElementBox>
  );
}

export function CoverCenterLayout(props: LayoutProps) {
  return (
    <SlideShell scene={props.scene} theme={props.theme}>
      {sortedElements(props.scene).map((el) =>
        renderElement(el, props.theme, "cover_center"),
      )}
    </SlideShell>
  );
}

export function TextOnlyLayout(props: LayoutProps) {
  return (
    <SlideShell scene={props.scene} theme={props.theme}>
      {sortedElements(props.scene).map((el) =>
        renderElement(el, props.theme, "text_only"),
      )}
    </SlideShell>
  );
}

export function TextBigNumberLayout(props: LayoutProps) {
  return (
    <SlideShell scene={props.scene} theme={props.theme}>
      {sortedElements(props.scene).map((el) =>
        renderElement(el, props.theme, "text_big_number"),
      )}
    </SlideShell>
  );
}

export function ChecklistLayout(props: LayoutProps) {
  return (
    <SlideShell scene={props.scene} theme={props.theme}>
      {sortedElements(props.scene).map((el) =>
        renderElement(el, props.theme, "checklist"),
      )}
    </SlideShell>
  );
}

export function CtaLayout(props: LayoutProps) {
  return (
    <SlideShell scene={props.scene} theme={props.theme}>
      {sortedElements(props.scene).map((el) =>
        renderElement(el, props.theme, "cta"),
      )}
    </SlideShell>
  );
}

export function TextImageRightLayout(props: LayoutProps) {
  const { theme, scene } = props;
  const texts = sortedElements(scene).filter((e) => e.type !== "image");
  const images = sortedElements(scene).filter((e) => e.type === "image");

  return (
    <SlideShell scene={scene} theme={theme}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          {texts.map((el) => renderElement(el, theme, "text_only"))}
        </div>
        <div
          style={{
            width: "42%",
            backgroundColor: theme.colors.surface ?? theme.colors.muted,
            position: "relative",
          }}
        >
          {images.length > 0
            ? images.map((el) => renderElement(el, theme, "text_image_right"))
            : null}
        </div>
      </div>
    </SlideShell>
  );
}

export function ImageBackgroundOverlayLayout(props: LayoutProps) {
  return (
    <SlideShell scene={props.scene} theme={props.theme}>
      {sortedElements(props.scene).map((el) =>
        renderElement(el, props.theme, "cover_center"),
      )}
    </SlideShell>
  );
}
