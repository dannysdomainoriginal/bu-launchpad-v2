import { feedbackData } from "@/app/dashboard/_data/feedback";
import FeedbackList from "@/components/dashboard/feedback-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeedbackTab() {
  return (
    <Card className="card-modern rounded-lg border-0 p-0">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-2xl font-semibold text-foreground">
          Feedback Received
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <FeedbackList feedback={feedbackData} />
      </CardContent>
    </Card>
  );
}
