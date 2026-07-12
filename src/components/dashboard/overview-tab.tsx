import { MessageSquareText } from "lucide-react";

import RecentActivity from "./recent-activity";
import StatsCards from "./stats-cards";
import type { DashboardEvent, DashboardStat } from "./types";
import { EmptySlate } from "@/components/ui/EmptySlate";

type Props = {
  stats: DashboardStat[];
  events: DashboardEvent[];
};

export default function OverviewTab({ stats, events }: Props) {
  return (
    <div>
      <StatsCards stats={stats} />

      <div className="space-y-6">
        {events.length > 0 ? (
          <RecentActivity events={events} />
        ) : (
          <EmptySlate
            message="Your activity feed is empty for now."
            Icon={MessageSquareText}
          />
        )}
      </div>

      <div className="space-y-6" aria-hidden="true" />
    </div>
  );
}
