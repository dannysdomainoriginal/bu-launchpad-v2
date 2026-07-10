"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import CollabsTab from "@/components/dashboard/collabs-tab";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardTabs from "@/components/dashboard/dashboard-tabs";
import FeedbackTab from "@/components/dashboard/feedback-tab";
import FloatingActionButton from "@/components/dashboard/floating-action-button";
import InnovationsTab, { ProductWithTags } from "@/components/dashboard/innovations-tab";
import MobileBottomNav from "@/components/dashboard/mobile-bottom-nav";
import OverviewTab from "@/components/dashboard/overview-tab";
import type {
  ActivityItem,
  Collaborator,
  DashboardStat,
  DashboardTab,
  FeedbackItem,
  InnovationItem,
  PendingRequest,
  ProductOverviewItem,
} from "@/components/dashboard/types";
import { DashboardTabSchemaType } from "@/modules/dashboard/dashboard.schema";



type DashboardCounts = {
  feedbackCount: number;
  collabCount: number;
  approvedProductCount: number;
  pendingProductCount: number;
};

type DashboardFeedbackSummary = {
  id: string;
  message: string;
  userName?: string | null;
  createdAt?: Date | string | null;
};

type DashboardCollaborationSummary = {
  id: string;
  userName?: string | null;
  message?: string | null;
  createdAt?: Date | string | null;
};

type Props = {
  initialTab: DashboardTabSchemaType;
  counts: DashboardCounts;
  products: ProductWithTags[];
  feedbacks: DashboardFeedbackSummary[];
  collaborations: DashboardCollaborationSummary[];
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
  collaborations,
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
            ? `${counts.feedbackCount} received`
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
            ? `${counts.collabCount} active requests`
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

  const productOverview = useMemo<ProductOverviewItem | null>(() => {
    const firstProduct = products[0];

    if (!firstProduct) {
      return null;
    }

    return {
      id: firstProduct.id,
      name: firstProduct.name,
      tagline: firstProduct.tagline ?? "A fresh idea for the community.",
      status: "Approved",
      ctaPrimary: "Edit Startup",
      ctaSecondary: "View Public Page",
    };
  }, [products]);

  const activities = useMemo<ActivityItem[]>(() => {
    const items: ActivityItem[] = [];

    if (counts.approvedProductCount > 0) {
      items.push({
        id: "approved",
        title: `${counts.approvedProductCount} startup${counts.approvedProductCount > 1 ? "s" : ""} approved`,
        detail: "Ready to share with the community",
        time: "Recently",
        icon: "approved",
      });
    }

    if (counts.feedbackCount > 0) {
      items.push({
        id: "feedback",
        title: `${counts.feedbackCount} new feedback item${counts.feedbackCount > 1 ? "s" : ""}`,
        detail: "Keep the conversation going",
        time: "Recently",
        icon: "feedback",
      });
    }

    if (counts.collabCount > 0) {
      items.push({
        id: "collab",
        title: `${counts.collabCount} collaborator request${counts.collabCount > 1 ? "s" : ""}`,
        detail: "Great opportunities to grow together",
        time: "Recently",
        icon: "collab",
      });
    }

    return items;
  }, [counts]);

  const feedbackItems = useMemo<FeedbackItem[]>(() => {
    return feedbacks.map((feedback) => ({
      id: feedback.id,
      author: feedback.userName ?? "Community member",
      message: feedback.message,
      initials: (feedback.userName ?? "C").charAt(0).toUpperCase(),
    }));
  }, [feedbacks]);

  const pendingRequests = useMemo<PendingRequest[]>(() => {
    return collaborations.map((collaboration) => ({
      id: collaboration.id,
      name: collaboration.userName ?? "Collaboration request",
      role: collaboration.message ?? "Would like to join your next launch",
    }));
  }, [collaborations]);

  const collaborators = useMemo<Collaborator[]>(() => {
    return collaborations.map((collaboration) => ({
      id: collaboration.id,
      name: collaboration.userName ?? "Collaborator",
      role: collaboration.message ?? "Joined your launch journey",
    }));
  }, [collaborations]);

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
        return <FeedbackTab feedbacks={feedbackItems} />;
      case "collabs":
        return (
          <CollabsTab
            pendingRequests={pendingRequests}
            collaborators={collaborators}
          />
        );
      case "innovations":
        return <InnovationsTab products={products} />;
      default:
        return (
          <OverviewTab
            stats={stats}
            productOverview={productOverview}
            activities={activities}
          />
        );
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

      {/* Floating Menu Feature */}
      <FloatingActionButton
        isOpen={isFabOpen}
        onToggle={() => setIsFabOpen((value) => !value)}
      />
      <MobileBottomNav
        activeTab={tab}
        onSelectTab={handleTabChange}
        onToggleFab={() => setIsFabOpen((value) => !value)}
      />
    </div>
  );
}
