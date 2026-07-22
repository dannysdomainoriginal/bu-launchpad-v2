import { and, desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { productCollaboration } from "@/lib/db/schema";

/* -------------------------------------------------------------------------- */
/*                            INSERT COLLAB REQUEST                           */
/* -------------------------------------------------------------------------- */
export async function insertCollaborationRequest(data: {
  id: string;
  productId: string;
  ownerId: string;

  requesterId: string;
  requesterName: string;
  requesterAvatar: string | null;

  message: string;
}) {
  const [existing] = await db
    .select({ id: productCollaboration.id })
    .from(productCollaboration)
    .where(
      and(
        eq(productCollaboration.productId, data.productId),
        eq(productCollaboration.requesterId, data.requesterId),
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
/*                         ACCEPT COLLAB REQUEST                              */
/* -------------------------------------------------------------------------- */
export async function acceptCollaborationRequest(
  requestId: string,
  ownerId: string,
) {
  await db
    .update(productCollaboration)
    .set({
      status: "accepted",
      reviewedAt: new Date(),
      reviewedBy: ownerId,
      updatedAt: new Date(),
    })
    .where(eq(productCollaboration.id, requestId));
}

/* -------------------------------------------------------------------------- */
/*                         REJECT COLLAB REQUEST                              */
/* -------------------------------------------------------------------------- */
export async function rejectCollaborationRequest(
  requestId: string,
  ownerId: string,
) {
  await db
    .update(productCollaboration)
    .set({
      status: "rejected",
      reviewedAt: new Date(),
      reviewedBy: ownerId,
      updatedAt: new Date(),
    })
    .where(eq(productCollaboration.id, requestId));
}

/* -------------------------------------------------------------------------- */
/*                      CHECK REQUEST STATUS FOR PRODUCT                        */
/* -------------------------------------------------------------------------- */
export async function checkCollaborationRequestStatus(
  productId: string,
  requesterId: string,
) {
  const [request] = await db
    .select({
      status: productCollaboration.status,
    })
    .from(productCollaboration)
    .where(
      and(
        eq(productCollaboration.productId, productId),
        eq(productCollaboration.requesterId, requesterId),
      ),
    )
    .limit(1);

  return request?.status ?? null;
}

/* -------------------------------------------------------------------------- */
/*                     GET SINGLE COLLAB REQUEST BY ID                        */
/* -------------------------------------------------------------------------- */
export async function getCollaborationRequestById(requestId: string) {
  // don't cache it
  
  const [request] = await db
    .select()
    .from(productCollaboration)
    .where(eq(productCollaboration.id, requestId))
    .limit(1);

  return request ?? null;
}

/* -------------------------------------------------------------------------- */
/*                    GET INCOMING COLLAB REQUESTS                            */
/* -------------------------------------------------------------------------- */
export async function getIncomingCollaborationRequests(ownerId: string) {
  "use cache";

  cacheTag("collaborations:list");
  cacheTag(`collaborations:owner:${ownerId}`);

  return db
    .select()
    .from(productCollaboration)
    .where(eq(productCollaboration.ownerId, ownerId))
    .orderBy(desc(productCollaboration.createdAt));
}

/* -------------------------------------------------------------------------- */
/*                    GET OUTGOING COLLAB REQUESTS                            */
/* -------------------------------------------------------------------------- */
export async function getOutgoingCollaborationRequests(requesterId: string) {
  "use cache";

  cacheTag("collaborations:list");
  cacheTag(`collaborations:requester:${requesterId}`);

  return db
    .select()
    .from(productCollaboration)
    .where(eq(productCollaboration.requesterId, requesterId))
    .orderBy(desc(productCollaboration.createdAt));
}
