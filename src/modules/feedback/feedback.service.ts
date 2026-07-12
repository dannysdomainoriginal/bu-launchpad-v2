import { db } from "@/lib/db";
import { productFeedback, products } from "@/lib/db/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { cacheTag } from "next/cache";

/* ------------------------------ CREATE FEEDBACK ------------------------------ */

export async function insertFeedback(
  data: typeof productFeedback.$inferInsert,
) {
  await db.insert(productFeedback).values(data);
}

/* ------------------------------ GET PRODUCT FEEDBACK ------------------------------ */

export async function getProductFeedback(productId: string) {
  "use cache";
  cacheTag("feedbacks:list");
  cacheTag(`feedbacks:product:${productId}`);

  return db
    .select()
    .from(productFeedback)
    .where(eq(productFeedback.productId, productId))
    .orderBy(desc(productFeedback.createdAt));
}

/* -------------------------------------------------------------------------- */
/*                           GET FEEDBACK BY USER ID                          */
/* -------------------------------------------------------------------------- */
export async function getFeedbacksByUserId(userId: string) {
  "use cache";
  cacheTag("feedbacks:list");
  cacheTag(`feedbacks:user-id:${userId}`);

  return await db
    .select({
      id: productFeedback.id,
      author: productFeedback.userName,
      avatar: productFeedback.userAvatar,
      message: productFeedback.message,
      createdAt: productFeedback.createdAt,
      productName: products.name,
    })
    .from(productFeedback)
    .innerJoin(products, eq(productFeedback.productId, products.id))
    .where(eq(products.authorId, userId))
    .orderBy(desc(productFeedback.createdAt))
    .limit(20);
}
