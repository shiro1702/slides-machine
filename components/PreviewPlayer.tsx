"use client";

import { Player } from "@remotion/player";
import { SlidePreview } from "@/remotion/SlidePreview";
import { getStyle } from "@/lib/meta";
import { dimensionsForFormat } from "@/lib/schemas";

const theme = getStyle("expert_minimal")!.tokens;
const { width, height } = dimensionsForFormat("portrait");

export function PreviewPlayer() {
  return (
    <Player
      component={SlidePreview}
      durationInFrames={90}
      compositionWidth={width}
      compositionHeight={height}
      fps={30}
      acknowledgeRemotionLicense
      style={{
        width: "100%",
        maxWidth: 360,
        aspectRatio: `${width} / ${height}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
      controls
      autoPlay
      loop
      inputProps={{
        title: "5 ошибок в прогреве",
        subtitle: "Sprint 0 · Remotion Player",
        theme,
        width,
        height,
      }}
    />
  );
}
