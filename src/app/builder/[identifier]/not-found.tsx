import Link from "next/link";
import { ArrowRight, SearchXIcon } from "lucide-react";

export default function BuilderNotFoundPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      {/* Icon Badge */}
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive shadow-lg shadow-destructive/10">
        <SearchXIcon className="h-12 w-12" />
      </div>

      {/* Title & Description */}
      <h1 className="mt-8 text-3xl font-bold tracking-tight">
        Builder not found
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
        We couldn't find the builder you're looking for. They may have deleted
        their account, or the link may be incorrect.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/explore"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Explore innovations
        </Link>

        <Link
          href="/dashboard"
          className="group inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
        >
          Home
          <ArrowRight className="ml-1.5 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
