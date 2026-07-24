import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { staticClerkClient } from "@/lib/clerk-client";
import { productCollaboration, products } from "@/lib/db/schema";

import { sendMail } from "../mail.service";
import { collaborationRequestEmailTemplate } from "../templates";

export async function handleCollaborationRequestEmail(requestId: string) {
  try {
    const [result] = await db
      .select({
        collaborationMessage: productCollaboration.message,
        requesterName: productCollaboration.requesterName,
        requesterAvatar: productCollaboration.requesterAvatar,
        requesterId: productCollaboration.requesterId, // 👈 Added: needed for builder profile link

        productName: products.name,
        productTagline: products.tagline,

        ownerId: productCollaboration.ownerId,
      })
      .from(productCollaboration)
      .innerJoin(products, eq(productCollaboration.productId, products.id))
      .where(eq(productCollaboration.id, requestId))
      .limit(1);

    if (!result) {
      throw new Error(`Collaboration request ${requestId} not found.`);
    }

    const owner = await staticClerkClient.users.getUser(result.ownerId);

    const recipientEmail =
      owner.primaryEmailAddress?.emailAddress ??
      owner.emailAddresses[0]?.emailAddress;

    if (!recipientEmail) {
      throw new Error(`Owner ${result.ownerId} has no email address.`);
    }

    // Fallback URL if env variable isn't loaded in runtime
    const baseUrl = process.env.BASE_URL || "https://bu-launchpad.vercel.app";

    const { subject, html } = collaborationRequestEmailTemplate({
      productName: result.productName,
      productTagline: result.productTagline,

      // Fixed property names matching the template props:
      requesterName: result.requesterName,
      requesterAvatar: result.requesterAvatar,

      collaborationMessage: result.collaborationMessage,

      // Generated dynamic URLs based on your BASE_URL:
      reviewRequestUrl: `${baseUrl}/dashboard?tab=collabs`,
      builderProfileUrl: `${baseUrl}/builder/${result.requesterId}`,
    });

    await sendMail({
      to: recipientEmail,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error(
      `Failed to send collaboration email for request ${requestId}:`,
      error,
    );

    return false;
  }
}
