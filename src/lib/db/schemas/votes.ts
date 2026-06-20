import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import { products } from "./products";

export const votes = pgTable(
  "votes",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.userId] }),
  }),
);