"use server";

import { revalidateTag } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

import { createCollaborationRequestSchema } from "./collaboration.schema";

import {
  handleCollaborationRequestEmail,
  handleCollaborationAcceptedEmail,
  handleCollaborationRejectedEmail,
} from "@/modules/mail";

import {
  checkCollaborationRequestStatus,
  insertCollaborationRequest,
  acceptCollaborationRequest,
  rejectCollaborationRequest,
} from "./collaboration.service";

type FormState = {
  success: boolean;
  message: string;
};

type Props = {
  productId: string;
  ownerId: string;
  message?: string;
};

/* -------------------------------------------------------------------------- */
/*                          ADD COLLABORATION REQUEST                         */
/* -------------------------------------------------------------------------- */
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

  const requesterName =
    user.fullName ||
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
    user.username ||
    "Anonymous";

  try {
    const inserted = await insertCollaborationRequest({
      id: requestId,
      productId: parsed.data.productId,
      ownerId: data.ownerId,

      requesterId: userId,
      requesterName,
      requesterAvatar: user.imageUrl ?? null,

      message: parsed.data.message,
    });

    if (!inserted) {
      return {
        success: true,
        message: "You've already sent a collaboration request.",
      };
    }

    const emailSent = await handleCollaborationRequestEmail(requestId);
    if (!emailSent) {
      console.warn(
        `Failed to send collaboration request email for request ${requestId}`,
      );
    }

    revalidateTag(`collaborations:requester:${userId}`, "max");
    revalidateTag(`collaborations:owner:${data.ownerId}`, "max");

    return {
      success: true,
      message: "Sent request straight to owner's mail.",
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

/* -------------------------------------------------------------------------- */
/*                          GET COLLAB REQUEST STATUS                         */
/* -------------------------------------------------------------------------- */
export async function getCollaborationRequestStatus(productId: string) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return checkCollaborationRequestStatus(productId, userId);
}

/* -------------------------------------------------------------------------- */
/*                        ACCEPT COLLAB REQUEST ACTION                         */
/* -------------------------------------------------------------------------- */
export async function acceptCollaborationRequestAction(
  requestId: string,
): Promise<FormState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to manage requests.",
    };
  }

  try {
    // 1. Update DB status
    await acceptCollaborationRequest(requestId, userId);

    // 2. Send email notification to requester
    const emailSent = await handleCollaborationAcceptedEmail(requestId);
    if (!emailSent) {
      console.warn(`Failed to send acceptance email for request ${requestId}`);
    }

    // 3. Revalidate cache tags if needed
    revalidateTag(`collaborations:owner:${userId}`, "max");

    return {
      success: true,
      message: "Collaboration request accepted successfully.",
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }

    return {
      success: false,
      message: "Failed to accept collaboration request.",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                        REJECT COLLAB REQUEST ACTION                         */
/* -------------------------------------------------------------------------- */
export async function rejectCollaborationRequestAction(
  requestId: string,
): Promise<FormState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to manage requests.",
    };
  }

  try {
    // 1. Update DB status
    await rejectCollaborationRequest(requestId, userId);

    // 2. Send email notification to requester
    const emailSent = await handleCollaborationRejectedEmail(requestId);
    if (!emailSent) {
      console.warn(`Failed to send rejection email for request ${requestId}`);
    }

    // 3. Revalidate cache tags if needed
    revalidateTag(`collaborations:owner:${userId}`, "max");

    return {
      success: true,
      message: "Collaboration request updated.",
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }

    return {
      success: false,
      message: "Failed to update collaboration request.",
    };
  }
}
