CREATE TABLE "product_collaborator" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"owner_id" varchar(255) NOT NULL,
	"collaborator_id" varchar(255) NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_collaborator" ADD CONSTRAINT "product_collaborator_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_collaborator_product_idx" ON "product_collaborator" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_collaborator_owner_idx" ON "product_collaborator" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "product_collaborator_collaborator_idx" ON "product_collaborator" USING btree ("collaborator_id");