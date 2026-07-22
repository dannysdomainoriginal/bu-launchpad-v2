"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import CollaborationRequestCard from "./ProductCollaborationRequestCard";
import { getCollaborationRequestStatusAction } from "@/modules/collaboration/collaboration.action";

type CollaborationStatus = "pending" | "accepted" | "rejected" | null;

type Props = {
  productId: string;
  ownerId: string;
};

export default function ProductCollaborationRequestBox({
  productId,
  ownerId,
}: Props) {
  const authContext = useAuth();

  const [isLoading, setIsLoading] = useState(() => Boolean(authContext.userId));

  const [requestStatus, setRequestStatus] = useState<CollaborationStatus>(null);

  const [errorVerifying, setErrorVerifying] = useState(false);

  useEffect(() => {
    if (!authContext.userId) {
      setIsLoading(false);
      setRequestStatus(null);
      setErrorVerifying(false);

      return;
    }

    let isMounted = true;

    const fetchStatus = async () => {
      setIsLoading(true);
      setErrorVerifying(false);

      try {
        const status = await getCollaborationRequestStatusAction(productId);

        if (isMounted) {
          setRequestStatus(status);
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

  return (
    <CollaborationRequestCard
      productId={productId}
      ownerId={ownerId}
      isSignedIn={!!authContext.userId}
      isLoading={isLoading}
      requestStatus={requestStatus}
      errorVerifying={errorVerifying}
      setRequestStatus={setRequestStatus}
    />
  );
}
