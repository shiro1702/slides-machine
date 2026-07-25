import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import type { Element, Scene, ThemeTokens } from "@/lib/schemas";
import { SAFE_AREA } from "../tokens";
import { elementText } from "./element-text";

export type LayoutProps = {
  scene: Scene;
  theme: ThemeTokens;
  width: number;
  height: number;
};

export function slideBackground(
  scene: Scene,
  theme: ThemeTokens,
): CSSProperties {
  const bg = scene.background;
  if (bg.type === "color") {
    return { backgroundColor: bg.value };
  }
  if (bg.type === "gradient") {
    return { backgroundImage: bg.value, backgroundColor: theme.colors.background };
  }
  if (bg.type === "image") {
    return {
      backgroundColor: theme.colors.background,
      backgroundImage: `url(${bg.value})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { backgroundColor: theme.colors.background };
}

export { elementText };

export function sortedElements(scene: Scene): Element[] {
  return [...scene.elements].sort((a, b) => a.zIndex - b.zIndex);
}

export function SafeFrame({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: SAFE_AREA.top,
        left: SAFE_AREA.left,
        right: SAFE_AREA.right,
        bottom: SAFE_AREA.bottom,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function AbsoluteElementBox({
  el,
  children,
  style,
}: {
  el: Element;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: el.x,
        top: el.y,
        width: el.width,
        height: el.height,
        zIndex: el.zIndex,
        opacity: el.opacity ?? 1,
        transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SlideShell({
  scene,
  theme,
  children,
}: {
  scene: Scene;
  theme: ThemeTokens;
  children: ReactNode;
}) {
  const overlay =
    scene.background.type === "image" && scene.background.overlayOpacity
      ? scene.background.overlayOpacity
      : 0;

  return (
    <AbsoluteFill style={slideBackground(scene, theme)}>
      {overlay > 0 ? (
        <AbsoluteFill
          style={{
            backgroundColor: `rgba(0,0,0,${overlay})`,
          }}
        />
      ) : null}
      {children}
    </AbsoluteFill>
  );
}
