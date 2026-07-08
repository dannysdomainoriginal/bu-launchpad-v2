import Link from "next/link";
import { ArrowRight, XCircle } from "lucide-react";

export default function SuccessNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/10">
        <XCircle className="h-12 w-12" />
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight">
        Submission not found
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
        We couldn’t find the requested submission. It may have been removed or
        the link is invalid.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/submit"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-light"
        >
          Back to submit
        </Link>

        <Link
          href="/dashboard"
          className="group inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
        >
          Dashboard
          <ArrowRight className="ml-1.5 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
