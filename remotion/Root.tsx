import { Composition } from "remotion";
import { dimensionsForFormat, parseProject } from "@/lib/schemas";
import { getStyle } from "@/lib/meta";
import { CarouselSlide, type CarouselSlideProps } from "./CarouselSlide";
import { SlidePreview, type SlidePreviewProps } from "./SlidePreview";
import { mistakesPortrait } from "@/fixtures/mistakes";

const defaultTheme = getStyle("expert_minimal")!.tokens;
const portrait = dimensionsForFormat("portrait");
const square = dimensionsForFormat("square");
const story = dimensionsForFormat("story");
const fixtureProject = parseProject(mistakesPortrait);

const defaultPreviewProps: SlidePreviewProps = {
  title: "5 ошибок в прогреве",
  subtitle: "Sprint 2 · Remotion preview",
  theme: defaultTheme,
  width: portrait.width,
  height: portrait.height,
};

const defaultSlideProps: CarouselSlideProps = {
  scene: fixtureProject.scenes[0]!,
  theme: fixtureProject.theme ?? defaultTheme,
  width: portrait.width,
  height: portrait.height,
};

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="CarouselSlide"
        component={CarouselSlide}
        durationInFrames={1}
        fps={30}
        width={portrait.width}
        height={portrait.height}
        defaultProps={defaultSlideProps}
        calculateMetadata={({ props }) => ({
          width: props.width,
          height: props.height,
          durationInFrames: 1,
          fps: 30,
        })}
      />
      <Composition
        id="CarouselSlideSquare"
        component={CarouselSlide}
        durationInFrames={1}
        fps={30}
        width={square.width}
        height={square.height}
        defaultProps={{
          ...defaultSlideProps,
          width: square.width,
          height: square.height,
        }}
      />
      <Composition
        id="CarouselSlideStory"
        component={CarouselSlide}
        durationInFrames={1}
        fps={30}
        width={story.width}
        height={story.height}
        defaultProps={{
          ...defaultSlideProps,
          width: story.width,
          height: story.height,
        }}
      />
      <Composition
        id="SlidePreview"
        component={SlidePreview}
        durationInFrames={90}
        fps={30}
        width={portrait.width}
        height={portrait.height}
        defaultProps={defaultPreviewProps}
      />
    </>
  );
}
