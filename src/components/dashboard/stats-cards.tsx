import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/components/dashboard/types";
import {
  CheckCircle2,
  MessageSquareText,
  Clock3,
  UsersRound,
} from "lucide-react";

interface StatsCardsProps {
  stats: DashboardStat[];
}

const iconMap = {
  feedback: MessageSquareText,
  collaborators: UsersRound,
  approved: CheckCircle2,
  pending: Clock3,
} as const;

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <Card
            key={stat.id}
            className={cn(
              "card-modern interactive rounded-[var(--radius-lg)] border-0 p-0",
              stat.span === "wide" && "lg:col-span-2",
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                {stat.value}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{stat.meta}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
