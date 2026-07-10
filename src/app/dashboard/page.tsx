import { LayoutDashboard } from "lucide-react";
import { Suspense } from "react";

import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";
import { DashboardTabsSkeleton } from "@/components/dashboard/dashboard-tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  return (
    <section className="pb-10 pt-15 md:pb-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            Icon={LayoutDashboard}
            title="Dashboard"
            description="Here's what's happening with your startups today."
          />
        </div>

        <Suspense
          fallback={
            <div>
              <DashboardTabsSkeleton />
            </div>
          }
        >
          <DashboardPageWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
