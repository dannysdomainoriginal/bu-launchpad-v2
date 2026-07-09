import { cn } from "@/lib/utils";
import type { DashboardTab } from "@/components/dashboard/types";
import { Home, MessageSquareText, Sparkles, UsersRound } from "lucide-react";

interface MobileBottomNavProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onToggleFab: () => void;
}

const tabs: { key: DashboardTab; label: string; icon: typeof Home }[] = [
  { key: "overview", label: "Overview", icon: Home },
  { key: "feedback", label: "Feedback", icon: MessageSquareText },
  { key: "collabs", label: "Collabs", icon: UsersRound },
  { key: "innovations", label: "Innovations", icon: Sparkles },
];

export default function MobileBottomNav({
  activeTab,
  onSelectTab,
  onToggleFab,
}: MobileBottomNavProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="relative mx-4 mb-4">
        <div className="glass-dark flex items-center justify-between rounded-full px-4 py-3 shadow-xl">
          <div className="flex items-center gap-1">
            {tabs.slice(0, 2).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onSelectTab(tab.key)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="absolute left-1/2 top-[-1.3rem] -translate-x-1/2">
            <button
              type="button"
              onClick={onToggleFab}
              className="glass-dark glow-primary flex h-14 w-14 items-center justify-center rounded-full shadow-xl"
            >
              <PlusIcon />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {tabs.slice(2).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onSelectTab(tab.key)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-6 w-6 text-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
