"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { createFeedbackSchema } from "./feedback.schema";
import { insertFeedback } from "./feedback.service";
import { revalidateTag } from "next/cache";

type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export async function addFeedbackAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
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
    productId: formData.get("productId"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid feedback input.",
      errors: parsed.error.flatten().fieldErrors,
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

    revalidateTag(`feedback:product:${parsed.data.productId}`, "max");

    return {
      success: true,
      message: "Feedback submitted.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to submit feedback.",
    };
  }
}
