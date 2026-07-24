"use client";

import { useTransition } from "react";
import { CircleAlert, Handshake, CheckCircle2, XCircle } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addCollaborationRequestAction } from "../collaboration.action";

type CollaborationStatus = "pending" | "accepted" | "rejected" | null;

export default function CollaborationRequestCard({
  productId,
  ownerId,
  isSignedIn,
  isLoading,
  requestStatus,
  errorVerifying,
  setRequestStatus,
}: {
  productId: string;
  ownerId: string;

  isSignedIn: boolean;
  isLoading: boolean;

  requestStatus: CollaborationStatus;
  errorVerifying: boolean;

  setRequestStatus: React.Dispatch<React.SetStateAction<CollaborationStatus>>;
}) {
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      try {
        const data = await addCollaborationRequestAction({
          productId,
          ownerId,
        });

        if (data.success) {
          setRequestStatus("pending");

          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error("submit collaboration request failed", err);

        toast.error("Failed to submit collaboration request.");
      }
    });
  };

  const button = (() => {
    if (!isSignedIn) {
      return (
        <SignUpButton>
          <Button variant="outline" className="w-full cursor-pointer py-5">
            Sign in to request collaboration
          </Button>
        </SignUpButton>
      );
    }

    if (isLoading) {
      return (
        <Button disabled variant="outline" className="w-full py-5">
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Loading...
        </Button>
      );
    }

    if (errorVerifying) {
      return (
        <Button disabled variant="outline" className="w-full py-5">
          <CircleAlert className="mr-2 size-4 text-amber-500" />
          Error verifying
        </Button>
      );
    }

    if (requestStatus === "accepted") {
      return (
        <Button disabled variant="outline" className="w-full py-5">
          <CheckCircle2 className="mr-2 size-4 text-green-600" />
          Collaboration Accepted
        </Button>
      );
    }

    if (requestStatus === "rejected") {
      return (
        <Button disabled variant="outline" className="w-full py-5">
          <XCircle className="mr-2 size-4 text-red-500" />
          Request Declined
        </Button>
      );
    }

    if (requestStatus === "pending") {
      return (
        <Button disabled variant="outline" className="w-full py-5">
          <Handshake className="mr-2 size-4" />
          Request Pending
        </Button>
      );
    }

    return (
      <Button
        type="button"
        onClick={submit}
        disabled={isPending}
        variant="outline"
        className="w-full cursor-pointer py-5 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Sending...
          </>
        ) : (
          <>
            <Handshake className="mr-2 size-4" />
            Request Collaboration
          </>
        )}
      </Button>
    );
  })();

  return (
    <Card className="h-fit overflow-hidden p-0">
      <div
        className="aspect-4/3 overflow-hidden bg-muted"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Looking to contribute?</h3>

          <p className="text-sm text-muted-foreground">
            Send a quick request to the builder and let them know you'd love to
            help shape this project.
          </p>
        </div>

        {button}

        {requestStatus === "pending" && (
          <p className="text-center text-xs text-muted-foreground">
            Your request has been sent. We'll notify you once the builder
            responds.
          </p>
        )}

        {requestStatus === "accepted" && (
          <p className="text-center text-xs text-green-600">
            The builder accepted your request. Check your email for next steps.
          </p>
        )}

        {requestStatus === "rejected" && (
          <p className="text-center text-xs text-muted-foreground">
            This request wasn't accepted. Keep exploring—you may find another
            project that's a great fit.
          </p>
        )}
      </div>
    </Card>
  );
}
