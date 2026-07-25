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
  const Layout = getLayoutComponent(scene.layout);
  return (
    <Layout scene={scene} theme={theme} width={width} height={height} />
  );
}
