import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { RelativeTime } from "@/components/ui/RelativeTime";

import CollaborationStatusBadge from "./CollaborationStatusBadge";
import IncomingRequestActions from "./IncomingRequestActions";

import type { IncomingCollaborationRequest } from "../collaboration.types";

interface Props {
  request: IncomingCollaborationRequest;
}

export default function IncomingRequestCard({ request }: Props) {
  const isPending = request.status === "pending";

  return (
    <Card className="rounded-lg">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarImage
                src={request.requesterAvatar ?? undefined}
                alt={request.requesterName}
              />

              <AvatarFallback>{request.requesterName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-semibold text-foreground">
                {request.requesterName}
              </h3>

              <p className="text-sm text-muted-foreground">
                <RelativeTime date={request.createdAt} />
              </p>
            </div>
          </div>

          {!isPending && <CollaborationStatusBadge status={request.status} />}
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Wants to collaborate on
          </p>

          <h4 className="font-medium text-foreground">{request.productName}</h4>
        </div>

        <div className="rounded-md bg-muted/40 p-4">
          <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
            {request.message}
          </p>
        </div>

        {isPending ? (
          <IncomingRequestActions collaborationId={request.id} />
        ) : (
          <p className="text-sm text-muted-foreground">
            {request.status === "accepted" ? "Accepted " : "Rejected "}
            <RelativeTime date={request.reviewedAt!} />
          </p>
        )}
      </CardContent>
    </Card>
  );
}
