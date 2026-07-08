import { Check } from "lucide-react";

export default function SuccessPageHeader() {
  return (
    <section className="text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-lg shadow-primary/10 animate-check-pop">
        <Check className="h-10 w-10 text-primary" strokeWidth={3} />
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl">
        Project submitted successfully.
      </h1>

      <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
        Your innovation is now under review and will be visible once approved.
      </p>
    </section>
  );
}
