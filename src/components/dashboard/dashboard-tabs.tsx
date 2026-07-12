import { cn } from "@/lib/utils";
import type { DashboardTab } from "@/components/dashboard/types";

interface DashboardTabsProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

const tabs: { key: DashboardTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "feedback", label: "Feedback" },
  { key: "collabs", label: "Collabs" },
  { key: "innovations", label: "Innovations" },
];

export function DashboardTabsSkeleton() {
  return (
    <div className="mb-8 hidden md:block">
      <div className="relative inline-flex gap-1 rounded-full bg-muted p-1.5">
        {tabs.map((tab) => (
          <span
            key={tab.key}
            className="relative z-10 rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground"
          >
            {tab.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardTabs({
  activeTab,
  onSelectTab,
}: DashboardTabsProps) {
  return (
    <div className="mb-8 hidden md:block">
      <div className="relative inline-flex gap-1 rounded-full bg-muted p-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectTab(tab.key)}
              className={cn(
                "cursor-pointer relative z-10 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
