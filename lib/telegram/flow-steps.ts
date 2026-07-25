export const FLOW_STEPS = [
  "idle",
  "await_niche",
  "await_topic",
  "await_style",
  "generating",
  "done",
] as const;

export type FlowStep = (typeof FLOW_STEPS)[number];

/** Session expires after 30 minutes of inactivity */
export const FLOW_TTL_MS = 30 * 60 * 1000;

export function isFlowStep(value: string): value is FlowStep {
  return (FLOW_STEPS as readonly string[]).includes(value);
}

export function isFlowExpired(updatedAt: Date, now = Date.now()): boolean {
  return now - updatedAt.getTime() > FLOW_TTL_MS;
}
