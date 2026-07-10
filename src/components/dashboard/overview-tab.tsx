import { AlertCircle, MessageSquareText } from "lucide-react";

import ProductOverviewCard from "@/components/dashboard/product-overview-card";
import RecentActivity from "@/components/dashboard/recent-activity";
import StatsCards from "@/components/dashboard/stats-cards";
import { EmptySlate } from "@/components/ui/EmptySlate";
import type {
  ActivityItem,
  DashboardStat,
  ProductOverviewItem,
} from "@/components/dashboard/types";

type Props = {
  stats: DashboardStat[];
  productOverview: ProductOverviewItem | null;
  activities: ActivityItem[];
};

export default function OverviewTab({
  stats,
  productOverview,
  activities,
}: Props) {
  return (
    <div>
      <StatsCards stats={stats} />
      <div className="grid gap-6 lg:grid-cols-[1.75fr_0.95fr]">
        <div className="space-y-6">
          {productOverview ? (
            <ProductOverviewCard product={productOverview} />
          ) : (
            <EmptySlate
              message="You have not published any products yet."
              Icon={AlertCircle}
            />
          )}

          {activities.length > 0 ? (
            <RecentActivity activities={activities} />
          ) : (
            <EmptySlate
              message="Your activity feed is empty for now."
              Icon={MessageSquareText}
            />
          )}
        </div>
        <div className="space-y-6" aria-hidden="true" />
      </div>
    </div>
  );
}
