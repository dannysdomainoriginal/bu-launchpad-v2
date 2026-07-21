import { Suspense } from "react";

import { SubmissionSuccessPageWrapper } from "@/components/success-page/SubmissionSuccessPageWrapper";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function SuccessPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="size-9 animate-spin rounded-full border-2 border-white/80 border-t-muted" />
        </div>
      }
    >
      <SubmissionSuccessPageWrapper params={params} />
    </Suspense>
  );
}
