import { RocketIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { Button } from "../ui/button";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <RocketIcon className="size-4 text-primary" />
    <span>BU Launchpad</span>
  </Link>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Menu */}
          <NavMenu />

          {/* Menu Buttons */}
          <div className="flex items-center gap-3">
            <Suspense fallback={<div>Loading Auth...</div>}>
              <Show when="signed-out">
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="rounded-xs px-4 py-4 cursor-pointer"
                  >
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="rounded-xs px-4 py-4 cursor-pointer">
                    Get Started
                  </Button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Button asChild className="rounded-xs px-4 py-4">
                  <Link href="/submit">
                    <SparklesIcon className="size-4" />
                    Submit Project
                  </Link>
                </Button>
                <UserButton />
              </Show>
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
