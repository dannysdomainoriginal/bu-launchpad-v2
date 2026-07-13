"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import CollaborationRequestCard from "./ProductCollaborationRequestCard";
import { getCollaborationRequestStatus } from "@/modules/collaboration/collaboration.action";

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
      setIsLoading(false);
      setHasRequested(false);
      setErrorVerifying(false);

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

  return (
    <CollaborationRequestCard
      productId={productId}
      isSignedIn={!!authContext.userId}
      isLoading={isLoading}
      hasRequested={hasRequested}
      errorVerifying={errorVerifying}
      setHasRequested={setHasRequested}
    />
  );
}
