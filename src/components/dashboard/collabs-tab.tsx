import { UsersRound } from "lucide-react";

import CollaboratorList from "@/components/dashboard/collaborator-list";
import { EmptySlate } from "@/components/ui/EmptySlate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  Collaborator,
  PendingRequest,
} from "@/components/dashboard/types";

type Props = {
  pendingRequests: PendingRequest[];
  collaborators: Collaborator[];
};

export default function CollabsTab({ pendingRequests, collaborators }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="card-modern rounded-lg border-0 p-0">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-xl font-semibold text-foreground">
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {pendingRequests.length > 0 ? (
            <CollaboratorList
              pendingRequests={pendingRequests}
              collaborators={[]}
              expressedInterest={undefined}
            />
          ) : (
            <EmptySlate
              message="No collaboration requests yet."
              Icon={UsersRound}
            />
          )}
        </CardContent>
      </Card>

      <Card className="card-modern rounded-lg border-0 p-0">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-xl font-semibold text-foreground">
            Current Collaborators
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {collaborators.length > 0 ? (
            <CollaboratorList
              pendingRequests={[]}
              collaborators={collaborators}
              expressedInterest={undefined}
            />
          ) : (
            <EmptySlate
              message="No collaborators on your launches yet."
              Icon={UsersRound}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
