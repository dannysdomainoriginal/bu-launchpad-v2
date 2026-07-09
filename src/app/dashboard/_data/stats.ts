import type { DashboardStat } from "@/components/dashboard/types";

export const statsData: DashboardStat[] = [
  {
    id: "feedback",
    title: "Feedback",
    value: "42",
    meta: "+9 this week",
    icon: "feedback",
    span: "wide",
  },
  {
    id: "collaborators",
    title: "Collaborators",
    value: "8",
    meta: "2 pending requests",
    icon: "collaborators",
  },
  {
    id: "approved",
    title: "Approved",
    value: "3",
    meta: "Published successfully",
    icon: "approved",
  },
  {
    id: "pending",
    title: "Pending Review",
    value: "2",
    meta: "Waiting for approval",
    icon: "pending",
  },
];
