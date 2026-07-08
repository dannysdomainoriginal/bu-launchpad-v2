import Link from "next/link";
import { ArrowLeft, SearchXIcon } from "lucide-react";

export default function ProductDetailsNotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive shadow-lg shadow-destructive/10">
        <SearchXIcon className="h-12 w-12" />
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight">
        Product not found
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
        We couldn’t locate that product. It may have been removed, not yet
        approved, or the link is invalid.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/explore"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-light"
        >
          Explore products
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/60"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
      </div>
    </main>
  );
}
