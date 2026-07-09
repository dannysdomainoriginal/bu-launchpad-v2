import {
  collaboratorsData,
  expressedInterestData,
  pendingRequestsData,
} from "@/app/dashboard/_data/collaborators";
import CollaboratorList from "@/components/dashboard/collaborator-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CollabsTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="card-modern rounded-lg border-0 p-0">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-xl font-semibold text-foreground">
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <CollaboratorList
            pendingRequests={pendingRequestsData}
            collaborators={[]}
            expressedInterest={expressedInterestData}
          />
        </CardContent>
      </Card>

      <Card className="card-modern rounded-lg border-0 p-0">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-xl font-semibold text-foreground">
            Current Collaborators
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <CollaboratorList
            pendingRequests={[]}
            collaborators={collaboratorsData}
            expressedInterest={undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
