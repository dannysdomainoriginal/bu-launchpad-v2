"use client";

import { useEffect, useState, useTransition } from "react";
import { CircleAlert, Handshake } from "lucide-react";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  addCollaborationRequestAction,
  getCollaborationRequestStatus,
} from "@/modules/collaboration/collaboration.action";

type Props = {
  productId: string;
};

export default function ProductCollaborationRequestBox({ productId }: Props) {
  const authContext = useAuth();
  const [isLoading, setIsLoading] = useState(() => Boolean(authContext.userId));
  const [hasRequested, setHasRequested] = useState(false);
  const [errorVerifying, setErrorVerifying] = useState(false);

  useEffect(() => {
    if (!authContext.userId) {
      return;
    }

    let isMounted = true;

    const fetchStatus = async () => {
      setIsLoading(true);
      setErrorVerifying(false);

      try {
        const requested = await getCollaborationRequestStatus(productId);

        if (isMounted) {
          setHasRequested(requested);
        }
      } catch (err) {
        console.error("Error fetching collaboration status:", err);

        if (isMounted) {
          setErrorVerifying(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [authContext.userId, productId]);

  if (!authContext.userId) {
    return (
      <SignUpButton>
        <Button variant="outline" className="w-full py-5">
          Sign In to request collaboration
        </Button>
      </SignUpButton>
    );
  }

  if (isLoading) {
    return (
      <Button
        disabled
        variant="outline"
        className="w-full py-5 cursor-pointer opacity-50"
      >
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        Loading...
      </Button>
    );
  }

  if (errorVerifying) {
    return (
      <Button
        disabled
        variant="outline"
        className="w-full py-5 cursor-pointer opacity-50"
      >
        <CircleAlert className="size-4 text-amber-500" />
        Error verifying
      </Button>
    );
  }

  return (
    <CollaborationRequestButton
      hasRequested={hasRequested}
      setHasRequested={setHasRequested}
      productId={productId}
    />
  );
}

function CollaborationRequestButton({
  hasRequested,
  setHasRequested,
  productId,
}: {
  hasRequested: boolean;
  setHasRequested: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      try {
        const data = await addCollaborationRequestAction({ productId });

        if (data?.success) {
          setHasRequested(true);
          toast.success(
            data.message ?? "Sent request straight to owner's mail",
          );
        } else {
          toast.error(
            data?.message ?? "Failed to submit collaboration request.",
          );
        }
      } catch (err) {
        console.error("submit collaboration request failed", err);
        toast.error("Failed to submit collaboration request.");
      }
    });
  };

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
            Send a quick request to the builder and let them know you&apos;d
            love to help shape this project.
          </p>
        </div>

        <Button
          type="button"
          onClick={submit}
          className="w-full py-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending || hasRequested}
          variant="outline"
        >
          {isPending ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : hasRequested ? (
            <>
              <Handshake className="mr-2 size-4" />
              Request Pending
            </>
          ) : (
            <>
              <Handshake className="mr-2 size-4" />
              Request collaboration
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
