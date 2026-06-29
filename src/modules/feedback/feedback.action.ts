"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { createFeedbackSchema } from "./feedback.schema";
import { insertFeedback } from "./feedback.service";
import { revalidateTag } from "next/cache";

type FormState = {
  success: boolean;
  message: string;
};

type Props = {
  productId: string;
  message: string;
}

export async function addFeedbackAction(data: Props): Promise<FormState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to give feedback.",
    };
  }

  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const parsed = createFeedbackSchema.safeParse({
    productId: data.productId,
    message: data.message,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message,
    };
  }

  const feedbackId = crypto.randomUUID();

  try {
    await insertFeedback({
      id: feedbackId,
      productId: parsed.data.productId,
      message: parsed.data.message,
      userId,
      userName:
        user.fullName ||
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
        user.username ||
        "Anonymous",
      userAvatar: user.imageUrl ?? null,
    });

    revalidateTag(`product:${parsed.data.productId}:feedback`, "max");

    return {
      success: true,
      message: "Feedback submitted successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to submit feedback.",
    };
  }
}
