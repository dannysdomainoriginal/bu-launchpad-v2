import { pgTable, uuid, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productCollaborator = pgTable(
  "product_collaborator",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),

    ownerId: varchar("owner_id", { length: 255 }).notNull(),

    collaboratorId: varchar("collaborator_id", {
      length: 255,
    }).notNull(),

    joinedAt: timestamp("joined_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    productIdx: index("product_collaborator_product_idx").on(table.productId),
    ownerIdx: index("product_collaborator_owner_idx").on(table.ownerId),
    collaboratorIdx: index("product_collaborator_collaborator_idx").on(
      table.collaboratorId,
    ),
  }),
);

export type ProductCollaboratorType = typeof productCollaborator.$inferSelect;
