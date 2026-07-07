import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { productCollaboration, products } from "@/lib/db/schema";
import { sendMail } from "../mail.service";
import { collaborationEmailTemplate } from "../templates";
import { deleteCollaborationRequestById } from "@/modules/collaboration/collaboration.service";

export async function handleCollaborationEmail(requestId: string) {
  try {
    const [result] = await db
      .select({
        collaborationMessage: productCollaboration.message,
        senderName: productCollaboration.userName,
        senderAvatar: productCollaboration.userAvatar,
        productName: products.name,
        productTagline: products.tagline,
        authorId: products.authorId,
      })
      .from(productCollaboration)
      .innerJoin(products, eq(productCollaboration.productId, products.id))
      .where(eq(productCollaboration.id, requestId))
      .limit(1);

    if (!result) {
      throw new Error(`Collaboration request ${requestId} not found.`);
    }

    const clerk = await clerkClient();
    const owner = await clerk.users.getUser(result.authorId);

    const recipientEmail =
      owner.primaryEmailAddress?.emailAddress ??
      owner.emailAddresses[0]?.emailAddress;

    if (!recipientEmail) {
      throw new Error(`Owner ${result.authorId} has no email address.`);
    }

    const { subject, html } = collaborationEmailTemplate({
      productName: result.productName,
      senderName: result.senderName,
      collaborationMessage: result.collaborationMessage,
      senderAvatar: result.senderAvatar,
      productTagline: result.productTagline,
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

    // clean up
    await deleteCollaborationRequestById(requestId);
    return false;
  }
}
