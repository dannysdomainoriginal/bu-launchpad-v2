import { activitiesData } from "@/app/dashboard/_data/activities";
import { productOverviewData } from "@/app/dashboard/_data/products";
import { statsData } from "@/app/dashboard/_data/stats";
import ProductOverviewCard from "@/components/dashboard/product-overview-card";
import RecentActivity from "@/components/dashboard/recent-activity";
import StatsCards from "@/components/dashboard/stats-cards";

export default function OverviewTab() {
  return (
    <div>
      <StatsCards stats={statsData} />
      <div className="grid gap-6 lg:grid-cols-[1.75fr_0.95fr]">
        <div className="space-y-6">
          <ProductOverviewCard product={productOverviewData} />
          <RecentActivity activities={activitiesData} />
        </div>
        <div className="space-y-6" aria-hidden="true" />
      </div>
    </div>
  );
}
