import { Composition } from "remotion";
import { dimensionsForFormat } from "@/lib/schemas";
import { getStyle } from "@/lib/meta";
import { SlidePreview, type SlidePreviewProps } from "./SlidePreview";

const defaultTheme = getStyle("expert_minimal")!.tokens;
const portrait = dimensionsForFormat("portrait");

const defaultProps: SlidePreviewProps = {
  title: "5 ошибок в прогреве",
  subtitle: "Sprint 0 · Remotion preview stub",
  theme: defaultTheme,
  width: portrait.width,
  height: portrait.height,
};

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="SlidePreview"
        component={SlidePreview}
        durationInFrames={90}
        fps={30}
        width={portrait.width}
        height={portrait.height}
        defaultProps={defaultProps}
      />
      <Composition
        id="SlidePreviewSquare"
        component={SlidePreview}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          ...defaultProps,
          width: 1080,
          height: 1080,
        }}
      />
      <Composition
        id="SlidePreviewStory"
        component={SlidePreview}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...defaultProps,
          width: 1080,
          height: 1920,
        }}
      />
    </>
  );
}
