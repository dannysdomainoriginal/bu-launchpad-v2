CREATE TABLE "product_collaboration" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"user_avatar" text,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_collaboration" ADD CONSTRAINT "product_collaboration_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "collaboration_product_idx" ON "product_collaboration" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "collaboration_user_idx" ON "product_collaboration" USING btree ("user_id");