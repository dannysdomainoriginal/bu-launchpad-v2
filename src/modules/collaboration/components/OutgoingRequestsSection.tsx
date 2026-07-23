import { Send } from "lucide-react";

import OutgoingRequestCard from "./OutgoingRequestCard";

import { EmptySlate } from "@/components/ui/EmptySlate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { OutgoingCollaborationRequest } from "../collaboration.types";

interface Props {
  requests: OutgoingCollaborationRequest[];
}

export default function OutgoingRequestsSection({ requests }: Props) {
  return (
    <Card className="card-modern rounded-lg border-0 p-0">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-xl font-semibold text-foreground">
          Requests You've Sent
        </CardTitle>

        <CardDescription>
          Track the status of your collaboration requests across projects.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <OutgoingRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <EmptySlate
            Icon={Send}
            message="When you request to collaborate on a project, it will appear here."
          />
        )}
      </CardContent>
    </Card>
  );
}
