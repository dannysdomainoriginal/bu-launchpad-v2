import { Suspense } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { UserRound } from "lucide-react";
import { BuilderProfileFormWrapper } from "@/modules/builder-profile/components";

type Props = {};

export default function DashboardProfilePage({}: Props) {
  return (
    <section className="pb-10 md:pb-20 pt-15">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Your Public Profile"
            Icon={UserRound}
            description="Help others learn you are, and what you're building."
          />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <BuilderProfileFormWrapper />
        </Suspense>
      </div>
    </section>
  );
}
