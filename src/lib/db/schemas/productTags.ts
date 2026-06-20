import { pgTable, varchar, uuid, index } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productTags = pgTable(
  "product_tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 50 }).notNull(),
  },
  (table) => ({
    tagNameIdx: index("tags_name_idx").on(table.name),
  }),
);

export type InsertProductTagsType = typeof productTags.$inferInsert;
