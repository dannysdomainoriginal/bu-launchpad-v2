import React from 'react'
import { SignInButton } from "@clerk/nextjs";

export default function ProductSignInBox() {
  return (
    <div className="max-w-2xl rounded-3xl border border-border bg-background/90 px-8 py-8 md:py-16 text-center shadow-sm">
      <p className="text-lg font-semibold">Sign in to submit your product</p>
      <p className="mt-3 text-sm text-muted-foreground">
        You need to be signed in with Clerk to publish a product. Your
        submission will include your profile data and stay linked to your
        account.
      </p>
      <div className="mt-8 flex justify-center">
        <SignInButton>
          <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 cursor-pointer">
            Sign in with Clerk
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
