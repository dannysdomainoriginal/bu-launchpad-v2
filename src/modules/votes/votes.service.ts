import { db } from "@/lib/db";
import { productVotes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

interface AddOrRemoveVoteParams {
  userId: string;
  productId: string;
}

/* -------------------------------------------------------------------------- */
/*                                  ADD VOTE                                  */
/* -------------------------------------------------------------------------- */
export async function addVote({ userId, productId }: AddOrRemoveVoteParams) {
  return db
    .insert(productVotes)
    .values({ productId, userId })
    .onConflictDoNothing();
}

/* -------------------------------------------------------------------------- */
/*                                 REMOVE VOTE                                */
/* -------------------------------------------------------------------------- */
export async function removeVote({ userId, productId }: AddOrRemoveVoteParams) {
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
}
