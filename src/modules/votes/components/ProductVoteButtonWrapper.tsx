import { auth } from "@clerk/nextjs/server";
import { SignUpButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { checkVoteStatus } from "../votes.service";
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
