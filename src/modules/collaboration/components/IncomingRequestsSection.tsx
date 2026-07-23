import { UsersRound } from "lucide-react";

import IncomingRequestCard from "./IncomingRequestCard";

import { EmptySlate } from "@/components/ui/EmptySlate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { IncomingCollaborationRequest } from "../collaboration.types";

interface Props {
  requests: IncomingCollaborationRequest[];
}

export default function IncomingRequestsSection({ requests }: Props) {
  return (
    <Card className="card-modern rounded-lg border-0 p-0">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-xl font-semibold text-foreground">
          Requests for Your Projects
        </CardTitle>

        <CardDescription>
          Review collaboration requests from builders interested in your
          projects.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <IncomingRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <EmptySlate
            Icon={UsersRound}
            message="When builders request to collaborate on your projects, they'll appear here."
          />
        )}
      </CardContent>
    </Card>
  );
}
