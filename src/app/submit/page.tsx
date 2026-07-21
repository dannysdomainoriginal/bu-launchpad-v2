import { SparklesIcon } from "lucide-react";
import { Suspense } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductSubmitFormWrapper } from "@/modules/products/components";

export default function SubmitPage() {
  return (
    <section className="pb-10 md:pb-20 pt-15">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Submit Your Innovation"
            Icon={SparklesIcon}
            description="Share your creation with the community. Your submission will be reviewed before going live."
          />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductSubmitFormWrapper />
        </Suspense>
      </div>
    </section>
  );
}
