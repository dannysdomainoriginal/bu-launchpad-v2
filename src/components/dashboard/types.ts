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

export type FeedbackItem = {
  id: string;
  author: string;
  avatar: string | null;
  message: string;
  createdAt: Date;
  productName: string;
};

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

export type ProductWithTags = {
  id: string;
  name: string;
  tagline: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  isApproved: boolean;
  image: string;
  liveUrl: string | null;
  voteCount: number;
  authorId: string;
  organizationId: string | null;
  authorName: string;
  authorAvatar: string;
  createdAt: Date;
  updatedAt: Date;
  tags: { name: string }[];
};

export type DashboardEvent = {
  id: string;
  userId: string;
  type:
    | "product_created"
    | "feedback_created"
    | "collab_request_created"
    | "collab_request_accepted"
    | "product_approved"
    | "product_rejected";

  actorId: string | null;
  actorName: string | null;
  actorAvatar: string | null;

  entityId: string | null;
  entityType: string | null;

  metadata: {
    productId?: string;
    productName?: string;
    productSlug?: string;
    preview?: string;
    reason?: string;
  } | null;

  readAt: Date | null;
  createdAt: Date;
};
