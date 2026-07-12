import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const eventTypes = [
  "product_created",
  "feedback_created",
  "collab_request_created",
  "collab_request_accepted",
  "product_approved",
  "product_rejected",
] as const;

export type EventType = (typeof eventTypes)[number];

export type EventMetadata = {
  productId?: string;
  productName?: string;
  productSlug?: string;
  preview?: string;
  reason?: string;
};

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // Owner of the activity feed item
    userId: varchar("user_id", { length: 255 }).notNull(),

    type: varchar("type", { length: 50 }).$type<EventType>().notNull(),

    // Snapshot of who triggered the event
    actorId: varchar("actor_id", { length: 255 }),
    actorName: varchar("actor_name", { length: 255 }),
    actorAvatar: text("actor_avatar"),

    // Optional reference to the originating record
    entityId: uuid("entity_id"),
    entityType: varchar("entity_type", { length: 50 }),

    // Denormalized data needed to render the activity
    metadata: jsonb("metadata").$type<EventMetadata>(),

    readAt: timestamp("read_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdx: index("events_user_idx").on(table.userId),

    userCreatedIdx: index("events_user_created_idx").on(
      table.userId,
      table.createdAt,
    ),

    unreadIdx: index("events_unread_idx").on(table.userId, table.readAt),
  }),
);

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
