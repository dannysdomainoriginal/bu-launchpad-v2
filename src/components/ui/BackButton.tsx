"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/explore");
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="group mb-6 h-9 px-5 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
      onClick={handleBack}
    >
      <ArrowLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-all duration-300" />
      Back
    </Button>
  );
}
