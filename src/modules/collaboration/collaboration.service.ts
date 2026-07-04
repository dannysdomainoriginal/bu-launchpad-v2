"use server";

import { and, desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { productCollaboration } from "@/lib/db/schema";

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

export async function getCollaborationRequestStatus(productId: string) {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return checkCollaborationRequestStatus(productId, userId);
}

export async function getProductCollaborationRequests(productId: string) {
  "use cache";
  cacheTag(`collaboration:product:${productId}`);

  return db
    .select()
    .from(productCollaboration)
    .where(eq(productCollaboration.productId, productId))
    .orderBy(desc(productCollaboration.createdAt));
}
