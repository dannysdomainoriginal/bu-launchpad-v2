"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, StarIcon } from "lucide-react";
import { useTransition } from "react";
import { addVote } from "../votes.service";

interface Props {
  hasVoted: boolean;
  productId: string;
  userId: string;
}

export default function ProductVoteButton({
  hasVoted,
  productId,
  userId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAddVote = () => {
    startTransition(async () => {
      try {
        await addVote({ productId, userId });
        window.alert("Your vote has been recorded!");
      } catch (err) {
        window.alert("Error recording your vote");
        console.error("handleAddVote failed:", err);
      }
    });
  };

  const handleRemoveVote = () => {
    startTransition(async () => {
      try {
        await addVote({ productId, userId });
        window.alert("You removed your vote for this innovation");
      } catch (err) {
        window.alert("Error removing your vote");
        console.error("handleRemoveVote failed:", err);
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={hasVoted ? handleRemoveVote : handleAddVote}
      variant="outline"
      className="w-full py-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Loading...
        </>
      ) : hasVoted ? (
        <>
          <CheckCircle className="size-4" />
          You support this!
        </>
      ) : (
        <>
          <StarIcon className="size-4" />
          Upvote innovation
        </>
      )}
    </Button>
  );
}
