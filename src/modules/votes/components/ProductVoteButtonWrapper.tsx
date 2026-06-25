"use client";

import { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import { SignUpButton, useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { getVoteStatus } from "../votes.service";

import ProductVoteButton from "./ProductVoteButton";

interface Props {
  product: { id: string; slug: string };
}

export default function ProductVoteButtonWrapper({ product }: Props) {
  const authContext = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [errorVerifying, setErrorVerifying] = useState(false);

  useEffect(() => {
    const fetchVoteStatus = async () => {
      setIsLoading(true);

      try {
        const voted = await getVoteStatus(product.id);
        setHasVoted(voted);
      } catch (err: any) {
        console.log("Error fetching vote status:", err);
        setErrorVerifying(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoteStatus();
  }, [product.id]);

  if (!authContext.userId) {
    return (
      <SignUpButton>
        <Button variant="outline" className="w-full py-5">
          Sign In to vote
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
    <ProductVoteButton
      hasVoted={hasVoted}
      setHasVoted={setHasVoted}
      product={product}
      userId={authContext.userId}
    />
  );
}
