"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquareText, PencilLine, Rocket, Plus } from "lucide-react";

interface FloatingActionButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const actions = [
  {
    label: "Submit New Innovation",
    icon: Rocket,
    className: "bg-primary text-primary-foreground",
  },
  {
    label: "Edit Profile",
    icon: PencilLine,
    className: "bg-secondary text-secondary-foreground",
  },
  {
    label: "Publish Startup",
    icon: MessageSquareText,
    className: "bg-[oklch(0.4_0.14_150)] text-[oklch(0.95_0.02_150)]",
  },
];

export default function FloatingActionButton({
  isOpen,
  onToggle,
}: FloatingActionButtonProps) {
  const actionItems = useMemo(() => actions, []);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity duration-200 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onToggle}
      />
      <div className="hidden md:block">
        <div className="fixed bottom-8 right-8 z-40">
          <div
            className={cn(
              "mb-4 flex flex-col items-end gap-3",
              isOpen ? "flex" : "hidden",
            )}
          >
            {actionItems.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  className="glass-dark flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-foreground shadow-lg"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs",
                      action.className,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {action.label}
                </button>
              );
            })}
          </div>
          <Button
            type="button"
            size="icon"
            onClick={onToggle}
            className={cn(
              "glass-dark glow-primary h-16 w-16 rounded-full border-0 shadow-xl",
              isOpen && "rotate-45",
            )}
          >
            <Plus className="h-7 w-7" />
          </Button>
        </div>
      </div>

      <div className="fixed bottom-28 right-1/2 z-40 translate-x-1/2 md:hidden">
        <div
          className={cn(
            "mb-4 flex flex-col items-center gap-3",
            isOpen ? "flex" : "hidden",
          )}
        >
          {actionItems.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                className="glass-dark flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-foreground shadow-lg"
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs",
                    action.className,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {action.label}
              </button>
            );
          })}
        </div>
        <Button
          type="button"
          size="icon"
          onClick={onToggle}
          className={cn(
            "glass-dark glow-primary h-14 w-14 rounded-full border-0 shadow-xl",
            isOpen && "rotate-45",
          )}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
