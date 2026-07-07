"use server";

import { revalidateTag } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

import { handleCollaborationEmail } from "@/modules/mail";

import { createCollaborationRequestSchema } from "./collaboration.schema";
import { insertCollaborationRequest } from "./collaboration.service";

type FormState = {
  success: boolean;
  message: string;
};

type Props = {
  productId: string;
  message?: string;
};

export async function addCollaborationRequestAction(
  data: Props,
): Promise<FormState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to request collaboration.",
    };
  }

  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const parsed = createCollaborationRequestSchema.safeParse({
    productId: data.productId,
    message: data.message,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message,
    };
  }

  const requestId = crypto.randomUUID();
  const senderName =
    user.fullName ||
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
    user.username ||
    "Anonymous";

  try {
    const inserted = await insertCollaborationRequest({
      id: requestId,
      productId: parsed.data.productId,
      message: parsed.data.message,
      userId,
      userName: senderName,
      userAvatar: user.imageUrl ?? null,
    });

    if (!inserted) {
      return {
        success: true,
        message: "Sent request straight to owner's mail",
      };
    }

    const success = await handleCollaborationEmail(requestId);
    if (!success) {
      return {
        success: false,
        message: "Failed to send collaboration request email.",
      };
    }

    revalidateTag(`product:${parsed.data.productId}:collaboration`, "max");

    return {
      success: true,
      message: "Sent request straight to owner's mail",
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }

    return {
      success: false,
      message: "Failed to submit collaboration request.",
    };
  }
}
