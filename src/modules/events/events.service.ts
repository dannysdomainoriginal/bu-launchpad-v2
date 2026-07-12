import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";

/* -------------------------------------------------------------------------- */
/*                            GET EVENTS BY USER ID                           */
/* -------------------------------------------------------------------------- */
export async function getEventsByUserId(userId: string, limit = 20) {
  "use cache";
  cacheTag("events:list");
  cacheTag(`events:user-id:${userId}`);

  return await db
    .select()
    .from(events)
    .where(eq(events.userId, userId))
    .orderBy(desc(events.createdAt))
    .limit(limit);
}
