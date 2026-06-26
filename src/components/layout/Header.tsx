"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { HomeIcon, Menu, RocketIcon, SparklesIcon, X } from "lucide-react";
import { CompassIcon, UserIcon } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <RocketIcon className="size-4 text-primary" />
    <span>BU Launchpad</span>
  </Link>
);

interface NavLink {
  label: string;
  Icon: typeof RocketIcon;
  link: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks: NavLink[] = [
    {
      label: "Home",
      Icon: HomeIcon,
      link: "/",
    },
    {
      label: "Explore",
      Icon: CompassIcon,
      link: "/explore",
    },
    // {
    //   label: "Your Profile",
    //   Icon: UserIcon,
    //   link: "/profile",
    // },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Menu */}
          <nav className={cn("items-center gap-1", "hidden sm:flex")}>
            {navLinks.map(({ label, link, Icon }) => (
              <Link
                key={label}
                href={link}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Menu Buttons */}
          <div className="hidden sm:flex items-center gap-3">
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

          {/* Mobile Nav */}
          <div className="sm:hidden flex items-center gap-2">
            <Suspense fallback={null}>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </Suspense>

            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-md p-2 hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Full width dropdown */}
        <div
          className={cn(
            "sm:hidden overflow-hidden transition-all duration-300",
            "absolute left-0 right-0",
            isOpen
              ? "max-h-128 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <div className="border-t bg-background/95 backdrop-blur px-5 py-6 space-y-3">
            {/* Navigation */}
            {navLinks.map(({ label, link, Icon }) => (
              <Link
                key={label}
                href={link}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}

            <div className="border-t pt-3">
              <Suspense fallback={null}>
                <Show when="signed-out">
                  <div className="flex flex-col gap-2">
                    <SignInButton>
                      <button className="w-full rounded-md px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer">
                        Log In
                      </button>
                    </SignInButton>

                    <SignUpButton>
                      <button className="w-full rounded-md px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer">
                        Get Started
                      </button>
                    </SignUpButton>
                  </div>
                </Show>

                <Show when="signed-in">
                  <Button
                    asChild
                    className="rounded-xs py-5 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/submit">
                      <SparklesIcon className="size-4" />
                      Submit Project
                    </Link>
                  </Button>
                </Show>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
