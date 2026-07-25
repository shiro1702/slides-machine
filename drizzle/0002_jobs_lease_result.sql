ALTER TABLE "jobs" ADD COLUMN "result" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "lease_expires_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "jobs_lease_expires_at_idx" ON "jobs" USING btree ("lease_expires_at");
