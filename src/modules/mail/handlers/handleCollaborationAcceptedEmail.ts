import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { staticClerkClient } from "@/lib/clerk-client";
import { productCollaboration, products } from "@/lib/db/schema";

import { sendMail } from "../mail.service";
import { collaborationAcceptedEmailTemplate } from "../templates";

export async function handleCollaborationAcceptedEmail(requestId: string) {
  try {
    const [result] = await db
      .select({
        productName: products.name,
        productTagline: products.tagline,
        ownerName: products.authorName,
        ownerAvatar: products.authorAvatar,
        ownerId: products.authorId,
        requesterId: productCollaboration.requesterId,
      })
      .from(productCollaboration)
      .innerJoin(products, eq(productCollaboration.productId, products.id))
      .where(eq(productCollaboration.id, requestId))
      .limit(1);

    if (!result) {
      throw new Error(`Collaboration request ${requestId} not found.`);
    }

    // Fetch the requester's email from Clerk
    const requester = await staticClerkClient.users.getUser(result.requesterId);

    const recipientEmail =
      requester.primaryEmailAddress?.emailAddress ??
      requester.emailAddresses[0]?.emailAddress;

    if (!recipientEmail) {
      throw new Error(`Requester ${result.requesterId} has no email address.`);
    }

    const baseUrl = process.env.BASE_URL || "https://bu-launchpad.vercel.app";

    const { subject, html } = collaborationAcceptedEmailTemplate({
      productName: result.productName,
      productTagline: result.productTagline,
      ownerName: result.ownerName,
      ownerAvatar: result.ownerAvatar,
      builderProfileUrl: `${baseUrl}/builder/${result.ownerId}`,
    });

    await sendMail({
      to: recipientEmail,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error(
      `Failed to send collaboration accepted email for request ${requestId}:`,
      error,
    );

    return false;
  }
}
