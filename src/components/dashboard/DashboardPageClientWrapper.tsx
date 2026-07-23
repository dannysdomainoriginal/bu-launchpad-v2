"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardTabs from "./dashboard-tabs";
import FeedbackTab from "./feedback-tab";
import FloatingActionButton from "./floating-action-button";
import InnovationsTab from "./innovations-tab";
import MobileBottomNav from "./mobile-bottom-nav";
import OverviewTab from "./overview-tab";

import type {
  DashboardEvent,
  DashboardStat,
  DashboardTab,
  FeedbackItem,
  ProductWithTags,
} from "./types";

import { DashboardTabSchemaType } from "@/modules/dashboard/dashboard.schema";
import { DashboardCollaborationTab } from "@/modules/collaboration/components";
import type {
  IncomingCollaborationRequest,
  OutgoingCollaborationRequest,
} from "@/modules/collaboration/collaboration.types";

type DashboardCounts = {
  feedbackCount: number;
  collabCount: number;
  approvedProductCount: number;
  pendingProductCount: number;
};

type Props = {
  initialTab: DashboardTabSchemaType;
  counts: DashboardCounts;
  products: ProductWithTags[];
  feedbacks: FeedbackItem[];
  incomingRequests: IncomingCollaborationRequest[];
  outgoingRequests: OutgoingCollaborationRequest[];
  events: DashboardEvent[];
};

const tabLabels: Record<DashboardTab, string> = {
  overview: "Overview",
  feedback: "Feedback",
  collabs: "Collabs",
  innovations: "Innovations",
};

export default function DashboardPageClientWrapper({
  initialTab,
  counts,
  products,
  feedbacks,
  incomingRequests,
  outgoingRequests,
  events,
}: Props) {
  const [tab, setTab] = useState<DashboardTab>(initialTab);
  const [isFabOpen, setIsFabOpen] = useState(false);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const stats = useMemo<DashboardStat[]>(() => {
    return [
      {
        id: "feedback",
        title: "Feedback",
        value: counts.feedbackCount.toString(),
        meta:
          counts.feedbackCount > 0
            ? `Feedback${counts.feedbackCount > 1 ? "s" : ""} received`
            : "No feedback yet",
        icon: "feedback",
        span: "wide",
      },
      {
        id: "collaborators",
        title: "Collaborators",
        value: counts.collabCount.toString(),
        meta:
          counts.collabCount > 0
            ? `Active request${counts.collabCount > 1 ? "s" : ""}`
            : "No collaboration requests",
        icon: "collaborators",
      },
      {
        id: "approved",
        title: "Approved",
        value: counts.approvedProductCount.toString(),
        meta:
          counts.approvedProductCount > 0
            ? "Published successfully"
            : "Awaiting your first approval",
        icon: "approved",
      },
      {
        id: "pending",
        title: "Pending Review",
        value: counts.pendingProductCount.toString(),
        meta:
          counts.pendingProductCount > 0
            ? "Waiting for approval"
            : "Nothing pending",
        icon: "pending",
      },
    ];
  }, [counts]);

  const handleTabChange = (nextTab: DashboardTab) => {
    setTab(nextTab);
    setIsFabOpen(false);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", nextTab);
      window.history.replaceState({}, "", `${url.pathname}${url.search}`);
    }
  };

  const renderTabContent = () => {
    switch (tab) {
      case "feedback":
        return <FeedbackTab feedbacks={feedbacks} />;

      case "collabs":
        return (
          <DashboardCollaborationTab
            incomingRequests={incomingRequests}
            outgoingRequests={outgoingRequests}
          />
        );

      case "innovations":
        return <InnovationsTab products={products} />;

      default:
        return <OverviewTab stats={stats} events={events} />;
    }
  };

  return (
    <div>
      <DashboardTabs activeTab={tab} onSelectTab={handleTabChange} />

      <div className="mb-6 md:hidden">
        <p className="text-lg font-semibold text-foreground">
          {tabLabels[tab]}
        </p>
      </div>

      {renderTabContent()}

      <FloatingActionButton
        isOpen={isFabOpen}
        onToggle={() => setIsFabOpen((value) => !value)}
      />

      <MobileBottomNav
        activeTab={tab}
        isFabOpen={isFabOpen}
        onSelectTab={handleTabChange}
        onToggleFab={() => setIsFabOpen((v) => !v)}
      />
    </div>
  );
}
