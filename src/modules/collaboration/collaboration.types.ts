export type CollaborationStatus = "pending" | "accepted" | "rejected";

export interface IncomingCollaborationRequest {
  id: string;

  requesterId: string;
  requesterName: string;
  requesterAvatar: string | null;

  productId: string;
  productName: string;

  message: string;

  status: CollaborationStatus;

  createdAt: Date;
  reviewedAt: Date | null;
}

export interface OutgoingCollaborationRequest {
  id: string;

  ownerId: string;
  ownerName: string;

  productId: string;
  productName: string;

  status: CollaborationStatus;

  createdAt: Date;
  reviewedAt: Date | null;
}
