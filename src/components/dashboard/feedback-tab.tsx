import { MessageSquareText } from "lucide-react";

import FeedbackList from "@/components/dashboard/feedback-list";
import { EmptySlate } from "@/components/ui/EmptySlate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FeedbackItem } from "@/components/dashboard/types";

type Props = {
  feedbacks: FeedbackItem[];
};

export default function FeedbackTab({ feedbacks }: Props) {
  return (
    <Card className="card-modern rounded-lg border-0 p-0">
      <CardContent className="px-6 py-6">
        {feedbacks.length > 0 ? (
          <FeedbackList feedback={feedbacks} />
        ) : (
          <EmptySlate
            message="There is no feedback for your products yet."
            Icon={MessageSquareText}
          />
        )}
      </CardContent>
    </Card>
  );
}
