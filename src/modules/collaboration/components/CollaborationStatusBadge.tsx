import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import type { CollaborationStatus } from "../collaboration.types";

interface Props {
  status: CollaborationStatus;
}

const statusStyles: Record<CollaborationStatus, string> = {
  pending:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300",
  accepted:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  rejected:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
};

const statusLabels: Record<CollaborationStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};

export default function CollaborationStatusBadge({ status }: Props) {
  return (
    <Badge variant="outline" className={cn("capitalize", statusStyles[status])}>
      {statusLabels[status]}
    </Badge>
  );
}
