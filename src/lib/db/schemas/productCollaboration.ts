import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { products } from "./products";

export const collaborationStatusEnum = pgEnum("collaboration_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const productCollaboration = pgTable(
  "product_collaboration",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),

    ownerId: varchar("owner_id", { length: 255 }).notNull(),

    requesterId: varchar("requester_id", { length: 255 }).notNull(),
    requesterName: varchar("requester_name", { length: 255 }).notNull(),
    requesterAvatar: text("requester_avatar"),

    message: text("message").notNull(),

    status: collaborationStatusEnum("status").default("pending").notNull(),

    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    reviewedBy: varchar("reviewed_by", { length: 255 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    productIdx: index("collaboration_product_idx").on(table.productId),
    ownerIdx: index("collaboration_owner_idx").on(table.ownerId),
    requesterIdx: index("collaboration_requester_idx").on(table.requesterId),
    statusIdx: index("collaboration_status_idx").on(table.status),
  }),
);

export type ProductCollaborationType = typeof productCollaboration.$inferSelect;
