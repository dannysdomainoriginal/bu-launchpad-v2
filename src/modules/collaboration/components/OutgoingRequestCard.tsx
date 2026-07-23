import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { RelativeTime } from "@/components/ui/RelativeTime";

import CollaborationStatusBadge from "./CollaborationStatusBadge";

import type { OutgoingCollaborationRequest } from "../collaboration.types";

interface Props {
  request: OutgoingCollaborationRequest;
}

export default function OutgoingRequestCard({ request }: Props) {
  const reviewLabel = request.status === "accepted" ? "Accepted" : "Rejected";

  return (
    <Card className="rounded-lg">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">
              {request.productName}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span>{request.ownerName}</span>
              <ArrowRight className="size-3" />
              <span>Project owner</span>
            </div>
          </div>

          <CollaborationStatusBadge status={request.status} />
        </div>

        <p className="text-sm text-muted-foreground">
          {request.status === "pending" ? (
            <>
              Sent <RelativeTime date={request.createdAt} />
            </>
          ) : (
            <>
              {reviewLabel} <RelativeTime date={request.reviewedAt!} />
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
