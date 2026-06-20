ALTER TABLE "votes" RENAME TO "product_votes";--> statement-breakpoint
ALTER TABLE "product_votes" DROP CONSTRAINT "votes_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "product_votes" DROP CONSTRAINT "votes_product_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "product_votes" ADD CONSTRAINT "product_votes_product_id_user_id_pk" PRIMARY KEY("product_id","user_id");--> statement-breakpoint
ALTER TABLE "product_votes" ADD CONSTRAINT "product_votes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;