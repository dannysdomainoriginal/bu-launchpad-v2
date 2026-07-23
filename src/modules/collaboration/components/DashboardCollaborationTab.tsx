import IncomingRequestsSection from "./IncomingRequestsSection";
import OutgoingRequestsSection from "./OutgoingRequestsSection";

import type {
  IncomingCollaborationRequest,
  OutgoingCollaborationRequest,
} from "../collaboration.types";

interface Props {
  incomingRequests: IncomingCollaborationRequest[];
  outgoingRequests: OutgoingCollaborationRequest[];
}

export default function CollaborationTab({
  incomingRequests,
  outgoingRequests,
}: Props) {
  return (
    <div className="space-y-8">
      <IncomingRequestsSection requests={incomingRequests} />

      <OutgoingRequestsSection requests={outgoingRequests} />
    </div>
  );
}