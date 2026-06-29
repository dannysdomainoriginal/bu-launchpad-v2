"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addFeedbackAction } from "@/modules/feedback/feedback.action";

type Props = {
  productId: string;
};

export default function ProductFeedbackMessageBox({ productId }: Props) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // prevent short messages
    if (message.trim().length < 3) {
      toast.error("Message must be at least 3 characters.");
      return;
    }

    startTransition(async () => {
      try {
        const data = await addFeedbackAction({ productId, message });

        if (data?.success) {
          toast.success(data.message ?? "Feedback submitted.");
          setMessage("");
        } else {
          toast.error(data?.message ?? "Failed to submit feedback.");
        }
      } catch (err) {
        console.error("submit feedback failed", err);
        toast.error("Failed to submit feedback.");
      }
    });
  };

  return (
    <Card className="h-fit p-6">
      <h3 className="text-xl">Share your feedback</h3>

      <form onSubmit={submit} className="space-y-4">
        <input type="hidden" name="productId" value={productId} />

        <Textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message (min 3 characters)..."
          className="h-30 border-accent"
          required
        />

        <Button
          type="submit"
          className="w-full py-5 cursor-pointer"
          disabled={isPending || message.trim().length < 3}
          variant="outline"
        >
          {isPending ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
              Sending...
            </>
          ) : (
            "Submit feedback"
          )}
        </Button>
      </form>
    </Card>
  );
}
