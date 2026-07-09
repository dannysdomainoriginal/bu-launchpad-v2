export type DashboardTab = "overview" | "feedback" | "collabs" | "innovations";

export interface DashboardStat {
  id: string;
  title: string;
  value: string;
  meta: string;
  icon: "feedback" | "collaborators" | "approved" | "pending";
  span?: "wide";
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: "approved" | "feedback" | "collab";
}

export interface FeedbackItem {
  id: string;
  author: string;
  message: string;
  initials: string;
}

export interface PendingRequest {
  id: string;
  name: string;
  role: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
}

export interface InnovationItem {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  votes: number;
  tags: string[];
  accent: "primary" | "blue" | "orange" | "pink";
}

export interface ProductOverviewItem {
  id: string;
  name: string;
  tagline: string;
  status: string;
  ctaPrimary: string;
  ctaSecondary: string;
}
