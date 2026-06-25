"use server";

import { and, eq, sql } from "drizzle-orm";
import { refresh, revalidatePath, revalidateTag } from "next/cache";

import { db } from "@/lib/db";
import { productVotes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";

interface AddOrRemoveVoteParams {
  userId: string;
  product: { id: string; slug: string };
}

/* -------------------------------------------------------------------------- */
/*                                  ADD VOTE                                  */
/* -------------------------------------------------------------------------- */
export async function addVote({ product, userId }: AddOrRemoveVoteParams) {
  await db
    .insert(productVotes)
    .values({ productId: product.id, userId })
    .onConflictDoNothing();

  revalidateTag(`product:by-id:${product.id}`, "max");
  revalidatePath(`/products/${product.slug}`, "page");
  refresh();
}

/* -------------------------------------------------------------------------- */
/*                                 REMOVE VOTE                                */
/* -------------------------------------------------------------------------- */
export async function removeVote({ product, userId }: AddOrRemoveVoteParams) {
  const { rowCount } = await db
    .delete(productVotes)
    .where(
      and(
        eq(productVotes.productId, product.id),
        eq(productVotes.userId, userId),
      ),
    );

  if (!rowCount) {
    throw new Error("PRODUCT_VOTE_NOT_FOUND");
  }

  revalidateTag(`product:by-id:${product.id}`, "max");
  revalidatePath(`/products/${product.slug}`, "page");
  refresh();
}

/* -------------------------------------------------------------------------- */
/*                              CHECK VOTE STATUS                             */
/* -------------------------------------------------------------------------- */
export async function checkVoteStatus(productId: string, userId: string) {
  const result = await db.execute(sql`
    SELECT EXISTS (
      SELECT 1 FROM product_votes
      WHERE product_id = ${productId}
      AND user_id = ${userId}
    )  
  `);

  return Boolean(result.rows[0]?.exists);
}

export async function getVoteStatus(productId: string) {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return checkVoteStatus(productId, userId);
}
