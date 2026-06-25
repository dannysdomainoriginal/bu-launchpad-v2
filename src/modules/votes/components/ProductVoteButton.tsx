"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, StarIcon } from "lucide-react";
import { useTransition } from "react";
import { addVote, removeVote } from "../votes.service";

interface Props {
  hasVoted: boolean;
  setHasVoted: React.Dispatch<React.SetStateAction<boolean>>;
  product: { id: string; slug: string };
  userId: string;
}

export default function ProductVoteButton({
  hasVoted,
  setHasVoted,
  product,
  userId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAddVote = () => {
    startTransition(async () => {
      try {
        await addVote({ product, userId });
        setHasVoted(true);
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
        await removeVote({ product, userId });
        setHasVoted(false);
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
