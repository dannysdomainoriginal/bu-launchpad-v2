import {
  Home,
  LayoutGrid,
  MessageSquareText,
  Sparkles,
  UsersRound,
} from "lucide-react";

export function MobileBottomNavSkeleton() {
  return (
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
      <div
        className="
          glass-nav
          flex
          items-center
          rounded-full
          p-2
        "
      >
        {/* Active Overview */}
        <div
          className="
            relative
            flex
            h-12
            flex-none
            items-center
            justify-center
            rounded-full
            bg-primary/15
            px-4
            text-primary
          "
        >
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            <span className="text-sm font-medium">Overview</span>
          </div>
        </div>

        {/* Remaining tabs */}
        <div className="flex h-12 flex-1 items-center justify-center text-muted-foreground">
          <MessageSquareText className="h-5 w-5" />
        </div>

        <div className="flex h-12 flex-1 items-center justify-center text-muted-foreground">
          <LayoutGrid className="h-5 w-5" />
        </div>

        <div className="flex h-12 flex-1 items-center justify-center text-muted-foreground">
          <UsersRound className="h-5 w-5" />
        </div>

        <div className="flex h-12 flex-1 items-center justify-center text-muted-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
