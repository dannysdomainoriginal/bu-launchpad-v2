"use client";

import { useState, useTransition } from "react";

import {
  acceptCollaborationRequestAction,
  rejectCollaborationRequestAction,
} from "../collaboration.action";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  collaborationId: string;
}

export default function IncomingRequestActions({
  collaborationId,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] = useState<
    "accept" | "reject" | null
  >(null);

  const handleAcceptRequest = () => {
    setPendingAction("accept");

    startTransition(async () => {
      try {
        await acceptCollaborationRequestAction(collaborationId);

        toast.success("Collaboration request accepted.");
      } catch (err) {
        setPendingAction(null);

        toast.error("Error accepting collaboration request.");
        console.error("handleAcceptRequest failed:", err);
      }
    });
  };

  const handleRejectRequest = () => {
    setPendingAction("reject");

    startTransition(async () => {
      try {
        await rejectCollaborationRequestAction(collaborationId);

        toast.success("Collaboration request declined.");
      } catch (err) {
        setPendingAction(null);

        toast.error("Error declining collaboration request.");
        console.error("handleRejectRequest failed:", err);
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        disabled={isPending}
        onClick={handleAcceptRequest}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending && pendingAction === "accept" ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Accepting...
          </>
        ) : (
          "Accept"
        )}
      </Button>

      <Button
        variant="outline"
        disabled={isPending}
        onClick={handleRejectRequest}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending && pendingAction === "reject" ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Rejecting...
          </>
        ) : (
          "Reject"
        )}
      </Button>
    </div>
  );
}