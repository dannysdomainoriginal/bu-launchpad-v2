import { db } from "@/lib/db";
import { productFeedback } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

/* ------------------------------ CREATE FEEDBACK ------------------------------ */

export async function insertFeedback(data: typeof productFeedback.$inferInsert) {
  await db.insert(productFeedback).values(data);
}

/* ------------------------------ GET PRODUCT FEEDBACK ------------------------------ */

export async function getProductFeedback(productId: string) {
  "use cache";
  cacheTag(`feedback:product:${productId}`);

  return db
    .select()
    .from(productFeedback)
    .where(eq(productFeedback.productId, productId))
    .orderBy(desc(productFeedback.createdAt));
}
