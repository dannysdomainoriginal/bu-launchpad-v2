import { Button } from "@/components/ui/button";
import { currentUser, auth } from "@clerk/nextjs/server";
import React from "react";
import { checkVoteStatus } from "../votes.service";
import { SignUpButton } from "@clerk/nextjs";
import ProductVoteButton from "./ProductVoteButton";

interface Props {
  productId: string;
}

export default async function ProductVoteButtonWrapper({ productId }: Props) {
  const authContext = await auth();

  if (!authContext.userId) {
    return (
      <SignUpButton>
        <Button variant="outline" className="w-full py-5">
          Sign In to vote
        </Button>
      </SignUpButton>
    );
  }

  const hasVoted = await checkVoteStatus(productId, authContext.userId);

  return (
    <ProductVoteButton
      hasVoted={hasVoted}
      productId={productId}
      userId={authContext.userId}
    />
  );
}
