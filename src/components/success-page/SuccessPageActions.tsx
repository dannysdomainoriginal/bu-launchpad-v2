import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SuccessPageActions() {
  return (
    <section className="mt-10 text-center">
      <div>
        <Button
          asChild
          className="h-12 rounded-xl px-6 text-sm font-medium inline-flex items-center"
        >
          <Link href="/dashboard">Navigate to Dashboard</Link>
        </Button>
      </div>

      <div className="mt-3">
        <Link
          href="/submit"
          className="text-xs text-muted-foreground hover:text-white transition-colors"
        >
          Submit another project
        </Link>
      </div>
    </section>
  );
}
