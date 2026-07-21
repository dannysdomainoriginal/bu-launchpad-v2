import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const builderProfiles = pgTable("builder_profiles", {
  userId: varchar("user_id", { length: 255 }).primaryKey(), // Clerk user ID
  headline: varchar("headline", { length: 120 }),
  bio: text("bio"),
  course: varchar("course", { length: 120 }),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  websiteUrl: text("website_url"),
  clerkCreatedAt: timestamp("clerk_created_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type BuilderProfile = typeof builderProfiles.$inferSelect;
export type InsertBuilderProfile = typeof builderProfiles.$inferInsert;
