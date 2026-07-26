import { createElement } from "react";
import type { Scene, ThemeTokens } from "@/lib/schemas";
import { getLayoutComponent } from "./layouts/registry";

export type CarouselSlideProps = {
  scene: Scene;
  theme: ThemeTokens;
  width: number;
  height: number;
};

export function CarouselSlide({
  scene,
  theme,
  width,
  height,
}: CarouselSlideProps) {
  return createElement(getLayoutComponent(scene.layout), {
    scene,
    theme,
    width,
    height,
  });
}
