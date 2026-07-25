import { describe, expect, it } from "vitest";
import { JOB_MAX_ATTEMPTS, JOB_LEASE_MS } from "./constants";

describe("job constants", () => {
  it("caps retries", () => {
    expect(JOB_MAX_ATTEMPTS).toBe(3);
    expect(JOB_LEASE_MS).toBeGreaterThan(60_000);
  });
});
