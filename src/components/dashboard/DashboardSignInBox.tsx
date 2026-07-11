import { SignInButton } from "@clerk/nextjs";

export default function DashboardSignInBox() {
  return (
    <div className="max-w-2xl rounded-3xl border border-border bg-background/90 px-8 py-8 text-center shadow-sm md:py-16">
      <p className="text-lg font-semibold">Sign in to view your dashboard</p>
      <p className="mt-3 text-sm text-muted-foreground">
        You need to be signed in with Clerk to see your products, feedback, and
        collaboration activity.
      </p>
      <div className="mt-8 flex justify-center">
        <SignInButton>
          <button className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90">
            Sign in with Clerk
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
