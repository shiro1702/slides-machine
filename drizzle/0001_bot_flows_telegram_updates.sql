CREATE TABLE "bot_flows" (
	"telegram_id" text PRIMARY KEY NOT NULL,
	"step" text DEFAULT 'idle' NOT NULL,
	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "telegram_updates" (
	"update_id" text PRIMARY KEY NOT NULL,
	"telegram_id" text,
	"processed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "bot_flows_updated_at_idx" ON "bot_flows" USING btree ("updated_at");