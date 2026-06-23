import { db } from "@/lib/db";
import { productVotes } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { refresh, revalidatePath } from "next/cache";

interface AddOrRemoveVoteParams {
  userId: string;
  productId: string;
}

/* -------------------------------------------------------------------------- */
/*                                  ADD VOTE                                  */
/* -------------------------------------------------------------------------- */
export async function addVote({ productId, userId }: AddOrRemoveVoteParams) {
  await db
    .insert(productVotes)
    .values({ productId, userId })
    .onConflictDoNothing();

  refresh();
}

/* -------------------------------------------------------------------------- */
/*                                 REMOVE VOTE                                */
/* -------------------------------------------------------------------------- */
export async function removeVote({ productId, userId }: AddOrRemoveVoteParams) {
  const { rowCount } = await db
    .delete(productVotes)
    .where(
      and(
        eq(productVotes.productId, productId),
        eq(productVotes.userId, userId),
      ),
    );

  if (!rowCount) {
    throw new Error("PRODUCT_VOTE_NOT_FOUND");
  }

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
