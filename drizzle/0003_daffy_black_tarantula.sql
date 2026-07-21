CREATE TABLE "builder_profiles" (
	"user_id" varchar(255) PRIMARY KEY NOT NULL,
	"headline" varchar(120),
	"bio" text,
	"course" varchar(120),
	"github_url" text,
	"linkedin_url" text,
	"twitter_url" text,
	"website_url" text,
	"clerk_created_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
