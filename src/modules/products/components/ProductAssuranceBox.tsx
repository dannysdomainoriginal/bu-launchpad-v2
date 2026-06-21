import { ShieldCheckIcon } from "lucide-react";

export default function ProductAssuranceBox() {
  return (
    <aside className="rounded-3xl border border-border bg-background/95 p-8 shadow-sm h-fit">
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold leading-tight">
            Your rights stay with you.
          </h2>
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          We review submissions to make sure every product is safe, useful, and
          aligned with our community standards. That review does not transfer
          ownership, copyright, or creator rights.
        </p>

        <p className="text-sm leading-7 text-muted-foreground">
          Each product remains linked to your account so authorship is preserved
          and your work stays attributed to you.
        </p>

        <div className="rounded-xl border border-primary/10 bg-primary/10 p-5 text-sm text-foreground">
          <p className="font-semibold text-foreground">
            Designed for visibility, not ownership transfer.
          </p>
          <p className="mt-2 text-muted-foreground">
            We're here to help meaningful innovations earn the visibility and
            recognition they deserve.
          </p>
        </div>
      </div>
    </aside>
  );
}
