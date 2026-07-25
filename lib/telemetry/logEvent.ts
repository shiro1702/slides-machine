export type TelemetryEventName =
  | "flow_started"
  | "niche_selected"
  | "topic_submitted"
  | "style_selected"
  | "generation_started"
  | "generation_succeeded"
  | "generation_failed"
  | "render_started"
  | "render_succeeded"
  | "render_failed"
  | "render_completed"
  | "delivery_started"
  | "delivery_succeeded"
  | "delivery_failed"
  | "delivery_skipped_idempotent";

export type TelemetryProps = {
  correlationId?: string;
  telegramIdHash?: string;
  projectId?: string;
  nicheId?: string;
  styleId?: string;
  templateId?: string;
  latencyMs?: number;
  errorCode?: string;
  attempts?: number;
  llmMode?: string;
  updateId?: string;
};

/** Short stable hash — do not log raw telegram ids in prod telemetry. */
export function hashTelegramId(telegramId: string): string {
  let h = 0;
  for (let i = 0; i < telegramId.length; i++) {
    h = (h * 31 + telegramId.charCodeAt(i)) >>> 0;
  }
  return `tg_${h.toString(16)}`;
}

export function newCorrelationId(): string {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Structured stdout event for Vercel/platform logs.
 * Never include tokens, prompts, or full user topic text.
 */
export function logEvent(
  name: TelemetryEventName,
  props: TelemetryProps = {},
): void {
  const line = JSON.stringify({
    type: "telemetry",
    event: name,
    ts: new Date().toISOString(),
    ...props,
  });
  console.log(line);
}
