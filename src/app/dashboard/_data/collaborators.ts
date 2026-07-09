import type {
  Collaborator,
  PendingRequest,
} from "@/components/dashboard/types";

export const pendingRequestsData: PendingRequest[] = [
  {
    id: "david",
    name: "David O.",
    role: "UI/UX Designer",
  },
];

export const collaboratorsData: Collaborator[] = [
  {
    id: "mary",
    name: "Mary E.",
    role: "Backend Developer",
  },
  {
    id: "sarah-o",
    name: "Sarah O.",
    role: "Product Designer",
  },
];

export const expressedInterestData = {
  id: "john",
  name: "John D.",
  role: "From a comment on Quiz App",
  quote: "I'd love to collaborate on this project.",
};
