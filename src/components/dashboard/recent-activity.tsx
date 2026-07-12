import {
  CheckCircle2,
  MessageSquareText,
  Rocket,
  UsersRound,
  XCircle,
} from "lucide-react";

import type { DashboardEvent } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  events: DashboardEvent[];
}

const iconMap = {
  product_created: Rocket,
  feedback_created: MessageSquareText,
  collab_request_created: UsersRound,
  collab_request_accepted: UsersRound,
  product_approved: CheckCircle2,
  product_rejected: XCircle,
} as const;

function buildActivity(event: DashboardEvent) {
  const productName = event.metadata?.productName ?? "your startup";

  switch (event.type) {
    case "product_created":
      return {
        title: "Startup submitted for review",
        detail: productName,
      };

    case "feedback_created":
      return {
        title: `${event.actorName ?? "Someone"} left feedback`,
        detail: productName,
      };

    case "collab_request_created":
      return {
        title: `${event.actorName ?? "Someone"} applied to collaborate`,
        detail: productName,
      };

    case "collab_request_accepted":
      return {
        title: `${event.actorName ?? "Someone"} accepted your collaboration request`,
        detail: productName,
      };

    case "product_approved":
      return {
        title: `${productName} is now live 🎉`,
        detail: "Your startup is now visible to the community.",
      };

    case "product_rejected":
      return {
        title: `${productName} was not approved.`,
        detail: event.metadata?.reason ?? "Startup needs changes",
      };
  }
}

export default function RecentActivity({ events }: RecentActivityProps) {
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
          View stats
        </Button>
      </CardHeader>

      <CardContent className="space-y-5 px-6 pb-6">
        {events.map((event) => {
          const activity = buildActivity(event);
          const Icon = iconMap[event.type];

          return (
            <div key={event.id} className="flex gap-4">
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
