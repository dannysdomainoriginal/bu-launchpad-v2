"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CollabsTab from "@/components/dashboard/collabs-tab";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardTabs from "@/components/dashboard/dashboard-tabs";
import FeedbackTab from "@/components/dashboard/feedback-tab";
import FloatingActionButton from "@/components/dashboard/floating-action-button";
import InnovationsTab from "@/components/dashboard/innovations-tab";
import MobileBottomNav from "@/components/dashboard/mobile-bottom-nav";
import OverviewTab from "@/components/dashboard/overview-tab";
import type { DashboardTab } from "@/components/dashboard/types";

const tabLabels: Record<DashboardTab, string> = {
  overview: "Overview",
  feedback: "Feedback",
  collabs: "Collabs",
  innovations: "Innovations",
};

export default function DashboardPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFabOpen, setIsFabOpen] = useState(false);

  const activeTab = useMemo<DashboardTab>(() => {
    const tab = searchParams.get("tab");
    if (
      tab === "overview" ||
      tab === "feedback" ||
      tab === "collabs" ||
      tab === "innovations"
    ) {
      return tab;
    }
    return "overview";
  }, [searchParams]);

  const handleTabChange = useCallback(
    (tab: DashboardTab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);
      setIsFabOpen(false);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "feedback":
        return <FeedbackTab />;
      case "collabs":
        return <CollabsTab />;
      case "innovations":
        return <InnovationsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl p-6 pb-32 md:pb-10">
        <DashboardHeader />
        <DashboardTabs activeTab={activeTab} onSelectTab={handleTabChange} />

        <div className="mb-6 md:hidden">
          <p className="text-lg font-semibold text-foreground">
            {tabLabels[activeTab]}
          </p>
        </div>

        {renderTabContent()}
      </div>

      <FloatingActionButton
        isOpen={isFabOpen}
        onToggle={() => setIsFabOpen((value) => !value)}
      />
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        onToggleFab={() => setIsFabOpen((value) => !value)}
      />
    </div>
  );
}
