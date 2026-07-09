import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ActivityItem } from "@/components/dashboard/types";
import { CheckCircle2, MessageSquareText, UsersRound } from "lucide-react";

interface RecentActivityProps {
  activities: ActivityItem[];
}

const iconMap = {
  approved: CheckCircle2,
  feedback: MessageSquareText,
  collab: UsersRound,
} as const;

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="card-modern rounded-lg border-0 p-0">
      <CardHeader className="flex flex-row items-start justify-between px-6 pt-6">
        <CardTitle className="text-xl font-semibold text-foreground">
          Recent Activity
        </CardTitle>
        <Button
          variant="link"
          className="px-0 text-sm text-primary-light hover:no-underline"
        >
          View all
        </Button>
      </CardHeader>
      <CardContent className="space-y-5 px-6 pb-6">
        {activities.map((activity) => {
          const Icon = iconMap[activity.icon];
          return (
            <div key={activity.id} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/70 text-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.detail}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
