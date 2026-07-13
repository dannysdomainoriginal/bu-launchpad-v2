import { PencilLine, Rocket, type LucideIcon } from "lucide-react";

export type DashboardAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  link: string;
};

export const dashboardActions: DashboardAction[] = [
  {
    id: "innovation",
    label: "Submit Innovation",
    icon: Rocket,
    link: "/submit",
  },
  {
    id: "profile",
    label: "Edit Profile",
    icon: PencilLine,
    link: "/profile/edit"
  },
];
