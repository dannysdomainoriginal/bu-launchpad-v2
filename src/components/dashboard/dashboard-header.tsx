import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground">
        Welcome back, Daniel 👋
      </h1>
      <p className="mt-2 text-muted-foreground">
        Here&apos;s what&apos;s happening with your startups today.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 md:hidden">
        <Button size="sm" className="rounded-full">
          New Innovation
        </Button>
        <Button size="sm" variant="outline" className="rounded-full">
          Open Profile
        </Button>
      </div>
    </div>
  );
}
