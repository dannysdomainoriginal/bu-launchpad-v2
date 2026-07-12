import { and, desc, eq, inArray } from "drizzle-orm";
import { cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { productCollaboration, products } from "@/lib/db/schema";

/* -------------------------------------------------------------------------- */
/*                            INSERT COLLAB REQUEST                           */
/* -------------------------------------------------------------------------- */
export async function insertCollaborationRequest(data: {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  message: string;
}) {
  const [existing] = await db
    .select({ id: productCollaboration.id })
    .from(productCollaboration)
    .where(
      and(
        eq(productCollaboration.productId, data.productId),
        eq(productCollaboration.userId, data.userId),
      ),
    )
    .limit(1);

  if (existing) {
    return false;
  }

  await db.insert(productCollaboration).values(data);
  return true;
}

/* -------------------------------------------------------------------------- */
/*                            DELETE COLLAB REQUEST                           */
/* -------------------------------------------------------------------------- */
export async function deleteCollaborationRequestById(requestId: string) {
  return db
    .delete(productCollaboration)
    .where(eq(productCollaboration.id, requestId));
}

/* -------------------------------------------------------------------------- */
/*                         CHECK COLLAB REQUEST STATUS                        */
/* -------------------------------------------------------------------------- */
export async function checkCollaborationRequestStatus(
  productId: string,
  userId: string,
) {
  const [existing] = await db
    .select({ id: productCollaboration.id })
    .from(productCollaboration)
    .where(
      and(
        eq(productCollaboration.productId, productId),
        eq(productCollaboration.userId, userId),
      ),
    )
    .limit(1);

  return Boolean(existing);
}

/* -------------------------------------------------------------------------- */
/*                      GET COLLAB REQUEST BY PRODUCT ID                      */
/* -------------------------------------------------------------------------- */
export async function getProductCollaborationRequests(productId: string) {
  "use cache";
  cacheTag("collaborations:list");
  cacheTag(`collaboration:product:${productId}`);

  return db
    .select()
    .from(productCollaboration)
    .where(eq(productCollaboration.productId, productId))
    .orderBy(desc(productCollaboration.createdAt));
}

/* -------------------------------------------------------------------------- */
/*                       GET COLLAB REQUESTS BY USER ID                       */
/* -------------------------------------------------------------------------- */
export async function getCollaborationsByUserId(userId: string) {
  "use cache";
  cacheTag("collaborations:list");
  cacheTag(`collaborations:user-id:${userId}`);

  return await db
    .select()
    .from(productCollaboration)
    .where(
      inArray(
        productCollaboration.productId,
        db
          .select({ id: products.id })
          .from(products)
          .where(eq(products.authorId, userId)),
      ),
    )
    .orderBy(desc(productCollaboration.createdAt))
    .limit(20);
}
