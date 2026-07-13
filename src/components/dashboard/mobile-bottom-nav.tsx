"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  Home,
  LayoutGrid,
  MessageSquareText,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { DashboardTab } from "@/components/dashboard/types";
import { dashboardActions } from "@/modules/dashboard/dashboard-actions";

interface MobileBottomNavProps {
  activeTab: DashboardTab;
  isFabOpen: boolean;
  onSelectTab: (tab: DashboardTab) => void;
  onToggleFab: () => void;
}

const navItems = [
  {
    key: "overview" as const,
    label: "Overview",
    icon: Home,
  },
  {
    key: "feedback" as const,
    label: "Feedback",
    icon: MessageSquareText,
  },
  {
    key: "menu" as const,
    label: "Menu",
    icon: LayoutGrid,
  },
  {
    key: "collabs" as const,
    label: "Collabs",
    icon: UsersRound,
  },
  {
    key: "innovations" as const,
    label: "Innovations",
    icon: Sparkles,
  },
];

export default function MobileBottomNav({
  activeTab,
  isFabOpen,
  onSelectTab,
  onToggleFab,
}: MobileBottomNavProps) {
  return (
    <>
      {/* ================= ACTION PANEL ================= */}

      <AnimatePresence>
        {isFabOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggleFab}
              className="
                fixed
                inset-0
                z-40
                bg-black/40
                backdrop-blur-sm
                md:hidden
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className="
                glass-panel
                fixed
                bottom-28
                left-1/2
                z-50
                w-[90%]
                max-w-sm
                -translate-x-1/2
                rounded-3xl
                p-2
                md:hidden
              "
            >
              {dashboardActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.id}
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      gap-4
                      rounded-2xl
                      px-4
                      py-4
                      text-left
                      transition-colors
                      hover:bg-white/5
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/15
                        text-primary
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-medium">{action.label}</span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MOBILE NAV ================= */}

      <div
        className="
          fixed
          left-1/2
          z-50
          w-[92%]
          max-w-md
          -translate-x-1/2
          md:hidden
          safe-bottom
        "
      >
        <LayoutGroup>
          <div
            className="
              glass-nav
              flex
              items-center
              rounded-full
              p-2
            "
          >
            {navItems.map((item) => {
              const isMenu = item.key === "menu";

              const isActive = isMenu
                ? isFabOpen
                : !isFabOpen && activeTab === item.key;

              const Icon = item.icon;

              return (
                <motion.button
                  key={item.key}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 32,
                  }}
                  onClick={() => {
                    if (isMenu) {
                      onToggleFab();
                      return;
                    }

                    onSelectTab(item.key);
                  }}
                  className={cn(
                    `
                      relative
                      flex
                      h-12
                      px-4
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      transition-colors
                    `,
                    isActive ? "w-auto px-4" : "flex-1",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {isActive && (
                    <motion.div
  layoutId="active-pill"
  className="
    absolute
    inset-0
    rounded-full
    bg-primary/15
  "
  transition={{
    type: "spring",
    stiffness: 450,
    damping: 32,
  }}
/>
                  )}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      gap-2
                    "
                  >
                    {isMenu ? (
                      <motion.div
                        animate={{
                          rotate: isFabOpen ? 90 : 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        {isFabOpen ? (
                          <X className="h-5 w-5 shrink-0" />
                        ) : (
                          <LayoutGrid className="h-5 w-5 shrink-0" />
                        )}
                      </motion.div>
                    ) : (
                      <Icon className="h-5 w-5 shrink-0" />
                    )}

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            width: 0,
                          }}
                          animate={{
                            opacity: 1,
                            width: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            width: 0,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="
                            overflow-hidden
                            whitespace-nowrap
                            text-sm
                            font-medium
                          "
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </>
  );
}
