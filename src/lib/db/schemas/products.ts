import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
  uuid,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    tagline: varchar("tagline", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 140 }).notNull(),
    description: text("description").notNull(),
    isFeatured: boolean("is_featured").notNull().default(false),
    isApproved: boolean("is_approved").notNull().default(false),
    image: text("image").notNull(),
    liveUrl: text("live_url"),
    voteCount: integer("vote_count").notNull().default(0),

    // Clerk IDs
    authorId: varchar("author_id", { length: 255 }).notNull(),
    organizationId: varchar("organization_id", { length: 255 }),

    // Hybrid Setup
    authorName: varchar("author_name", { length: 255 }).notNull(), // Speed-optimized snapshot
    authorAvatar: text("author_avatar").notNull(),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
    authorIdIdx: index("products_author_id_idx").on(table.authorId),
    organizationIdx: index("products_organization_idx").on(
      table.organizationId,
    ),
  }),
);

export type ProductType = typeof products.$inferSelect;
export type ProductWithTags = ProductType & { tags: { name: string }[] };
export type InsertProductType = typeof products.$inferInsert;
