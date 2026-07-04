import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { products } from "./products";

export const productCollaboration = pgTable(
  "product_collaboration",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),

    userId: varchar("user_id", { length: 255 }).notNull(),
    userName: varchar("user_name", { length: 255 }).notNull(),
    userAvatar: text("user_avatar"),

    message: text("message").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    productIdx: index("collaboration_product_idx").on(table.productId),
    userIdx: index("collaboration_user_idx").on(table.userId),
  }),
);

export type ProductCollaborationType = typeof productCollaboration.$inferSelect;
