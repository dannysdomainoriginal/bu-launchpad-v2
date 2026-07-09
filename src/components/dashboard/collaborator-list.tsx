import { Button } from "@/components/ui/button";
import type {
  Collaborator,
  PendingRequest,
} from "@/components/dashboard/types";

interface CollaboratorListProps {
  pendingRequests: PendingRequest[];
  collaborators: Collaborator[];
  expressedInterest?: {
    id: string;
    name: string;
    role: string;
    quote: string;
  };
}

export default function CollaboratorList({
  pendingRequests,
  collaborators,
  expressedInterest,
}: CollaboratorListProps) {
  return (
    <div className="space-y-4">
      {pendingRequests.map((request) => (
        <div key={request.id} className="rounded-md border border-border p-4">
          <h3 className="font-medium text-foreground">{request.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{request.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="rounded-md">Accept</Button>
            <Button variant="outline" className="rounded-md">
              Decline
            </Button>
          </div>
        </div>
      ))}

      {expressedInterest ? (
        <div className="rounded-md border border-dashed border-border p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Expressed Interest
          </h3>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-foreground">
                {expressedInterest.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {expressedInterest.role}
              </p>
            </div>
          </div>
          <p className="mt-3 text-foreground">
            &quot;{expressedInterest.quote}&quot;
          </p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-primary-light hover:underline"
          >
            Start conversation →
          </button>
        </div>
      ) : null}

      {collaborators.map((collaborator) => (
        <div
          key={collaborator.id}
          className="rounded-md border border-border p-4 text-foreground"
        >
          {collaborator.name} — {collaborator.role}
        </div>
      ))}
    </div>
  );
}
