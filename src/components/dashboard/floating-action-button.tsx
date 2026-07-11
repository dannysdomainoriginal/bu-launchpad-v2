"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, X } from "lucide-react";

import { dashboardActions } from "@/modules/dashboard/dashboard-actions";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FloatingActionButton({
  isOpen,
  onToggle,
}: Props) {
  return (
    <div className="hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="
                fixed
                inset-0
                z-40
                bg-black/30
                backdrop-blur-sm
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
                right-8
                z-50
                w-80
                rounded-3xl
                p-2
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
                      cursor-pointer
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

                    <span className="font-medium">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={onToggle}
          className="
            glass-nav
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            hover:scale-105
            cursor-pointer
          "
        >
          <motion.div
            animate={{
              rotate: isOpen ? 90 : 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <LayoutGrid className="h-6 w-6" />
            )}
          </motion.div>
        </button>
      </div>
    </div>
  );
}