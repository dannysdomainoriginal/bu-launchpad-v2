import { Suspense } from "react";
import DashboardPageClient from "@/components/dashboard/dashboard-page-client";
import DashboardPageSkeleton from "@/components/dashboard/dashboard-page-skeleton";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <DashboardPageClient />
    </Suspense>
  );
}
