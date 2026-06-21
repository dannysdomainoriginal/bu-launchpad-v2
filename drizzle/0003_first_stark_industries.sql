ALTER TABLE "products" ALTER COLUMN "name" SET DATA TYPE varchar(120);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "tagline" varchar(255) NOT NULL;