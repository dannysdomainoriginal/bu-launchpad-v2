import { PencilLine, Rocket, type LucideIcon } from "lucide-react";

export type DashboardAction = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const dashboardActions: DashboardAction[] = [
  {
    id: "innovation",
    label: "Submit Innovation",
    icon: Rocket,
  },
  {
    id: "profile",
    label: "Edit Profile",
    icon: PencilLine,
  },
];
