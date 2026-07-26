import { LAYOUT_IDS } from "@/lib/schemas";
import type { LayoutId } from "@/lib/meta/types";

const KNOWN = new Set<string>(LAYOUT_IDS);

/** Validate layout id without importing Remotion React components. */
export function assertKnownLayout(layoutId: string): asserts layoutId is LayoutId {
  if (!KNOWN.has(layoutId)) {
    throw new Error(`Unknown layout id: ${layoutId}`);
  }
}

export function isKnownLayout(layoutId: string): layoutId is LayoutId {
  return KNOWN.has(layoutId);
}
