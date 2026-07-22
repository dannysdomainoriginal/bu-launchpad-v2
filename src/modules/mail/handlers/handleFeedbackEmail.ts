import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { staticClerkClient } from "@/lib/clerk-client";
import { productFeedback, products } from "@/lib/db/schema";

import { sendMail } from "../mail.service";
import { feedbackEmailTemplate } from "../templates";

export async function handleFeedbackEmail(feedbackId: string) {
  // 1. Fetch everything needed from Postgres in one query
  const [result] = await db
    .select({
      feedbackMessage: productFeedback.message,
      senderName: productFeedback.userName,
      productName: products.name,
      authorId: products.authorId,
    })
    .from(productFeedback)
    .innerJoin(products, eq(productFeedback.productId, products.id))
    .where(eq(productFeedback.id, feedbackId))
    .limit(1);

  if (!result) {
    throw new Error(`Feedback ${feedbackId} not found.`);
  }

  const owner = await staticClerkClient.users.getUser(result.authorId);

  const recipientEmail =
    owner.primaryEmailAddress?.emailAddress ??
    owner.emailAddresses[0]?.emailAddress;

  if (!recipientEmail) {
    throw new Error(`Owner ${result.authorId} has no email address.`);
  }

  // 3. Build the email
  const { subject, html } = feedbackEmailTemplate({
    productName: result.productName,
    senderName: result.senderName,
    feedbackMessage: result.feedbackMessage,
  });

  // 4. Send it
  try {
    await sendMail({
    to: recipientEmail,
    subject,
    html,
  });
  } catch (error) {
    console.error(
      `Failed to send feedback email for feedback ${feedbackId}:`,
      error,
    );
  }
}
