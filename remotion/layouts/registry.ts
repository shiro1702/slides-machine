import type { ComponentType } from "react";
import type { LayoutId } from "@/lib/meta/types";
import { assertKnownLayout } from "./assert-layout";
import {
  ChecklistLayout,
  CoverCenterLayout,
  CtaLayout,
  ImageBackgroundOverlayLayout,
  TextBigNumberLayout,
  TextImageRightLayout,
  TextOnlyLayout,
} from "./index";
import type { LayoutProps } from "./shared";

const LAYOUT_COMPONENTS: Partial<
  Record<LayoutId, ComponentType<LayoutProps>>
> = {
  cover_center: CoverCenterLayout,
  text_only: TextOnlyLayout,
  text_big_number: TextBigNumberLayout,
  checklist: ChecklistLayout,
  cta: CtaLayout,
  text_image_right: TextImageRightLayout,
  image_background_dark_overlay: ImageBackgroundOverlayLayout,
  text_with_badge: TextOnlyLayout,
  quote: TextOnlyLayout,
  text_image_left: TextImageRightLayout,
  image_top_text_bottom: TextOnlyLayout,
  image_bottom_text_top: TextOnlyLayout,
};

export function getLayoutComponent(
  layoutId: string,
): ComponentType<LayoutProps> {
  assertKnownLayout(layoutId);
  const Component = LAYOUT_COMPONENTS[layoutId];
  if (!Component) {
    throw new Error(`Unknown layout id: ${layoutId}`);
  }
  return Component;
}

export { assertKnownLayout } from "./assert-layout";
