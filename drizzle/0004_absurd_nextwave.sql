CREATE TYPE "public"."collaboration_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
ALTER TABLE "product_collaboration" RENAME COLUMN "user_id" TO "requester_id";--> statement-breakpoint
ALTER TABLE "product_collaboration" RENAME COLUMN "user_name" TO "requester_name";--> statement-breakpoint
ALTER TABLE "product_collaboration" RENAME COLUMN "user_avatar" TO "requester_avatar";--> statement-breakpoint
DROP INDEX "collaboration_user_idx";--> statement-breakpoint
ALTER TABLE "product_collaboration" ADD COLUMN "owner_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product_collaboration" ADD COLUMN "status" "collaboration_status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "product_collaboration" ADD COLUMN "reviewed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "product_collaboration" ADD COLUMN "reviewed_by" varchar(255);--> statement-breakpoint
ALTER TABLE "product_collaboration" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "collaboration_owner_idx" ON "product_collaboration" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "collaboration_requester_idx" ON "product_collaboration" USING btree ("requester_id");--> statement-breakpoint
CREATE INDEX "collaboration_status_idx" ON "product_collaboration" USING btree ("status");