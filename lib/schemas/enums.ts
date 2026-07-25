export const PROJECT_TYPES = [
  "carousel",
  "video_carousel",
  "reel",
] as const;

export const PROJECT_STATUSES = [
  "draft",
  "queued",
  "rendering",
  "ready",
  "failed",
] as const;

export const ELEMENT_TYPES = [
  "text",
  "image",
  "sticker",
  "shape",
  "chart",
  "icon",
  "logo",
  "background",
  "badge",
  "arrow",
  "progress_bar",
] as const;

/** MVP layout ids from doc/product/slide-engine.md */
export const LAYOUT_IDS = [
  "cover_center",
  "text_only",
  "text_big_number",
  "text_with_badge",
  "quote",
  "checklist",
  "cta",
  "text_image_right",
  "text_image_left",
  "image_background_dark_overlay",
  "image_top_text_bottom",
  "image_bottom_text_top",
] as const;

export const TEMPLATE_IDS = [
  "expert_list",
  "mistakes",
  "problem_solution",
  "myth_truth",
  "checklist",
  "case_study",
  "before_after",
] as const;

export const THEME_IDS = [
  "expert_minimal",
  "bright_marketing",
  "premium_realestate",
] as const;

export const NICHE_IDS = ["experts", "realestate", "smm"] as const;

export const EXPORT_TYPES = ["png_zip", "mp4", "telegram_album"] as const;

export const ANIMATION_PRESETS = [
  "none",
  "fade",
  "slide",
  "scale",
  "bounce",
  "floating",
  "pulse",
  "typewriter",
  "highlight",
] as const;

export const TRANSITION_TYPES = [
  "none",
  "fade",
  "slide",
  "zoom",
] as const;

export const JOB_TYPES = [
  "generate_content",
  "render_carousel",
  "send_to_telegram",
  "render_mp4",
] as const;

export const JOB_STATUSES = [
  "queued",
  "running",
  "succeeded",
  "failed",
  "cancelled",
] as const;

export const USER_PLANS = ["free", "pro", "admin"] as const;
