import { cn } from "@/lib/utils";
import { RocketIcon } from "lucide-react";

export type StatCardProps = {
  icon: typeof RocketIcon;
  value: string;
  label: string;
  hasBorder?: boolean;
};

export default function StatsCard({
  icon: Icon,
  value,
  label,
  hasBorder,
}: StatCardProps) {
  return (
    <div className={cn("space-y-2", hasBorder && "sm:border-x border-border/50")}>
      <div className="flex items-center justify-center gap-2">
        <Icon className="size-5 text-primary/70" />
        <p className="text-3xl sm:text-4xl font-bold">{value}</p>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
