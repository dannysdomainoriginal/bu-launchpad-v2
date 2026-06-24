import { TelescopeIcon } from "lucide-react";
import { Suspense } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import ExplorePageContentWrapper from "@/components/explore/ExplorePageContentWrapper";

interface Props {
  searchParams: Promise<Record<string, string>>
}

export default function ExplorePage({ searchParams }: Props) {
  return (
    <section className="pb-10 md:pb-20 pt-15">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            Icon={TelescopeIcon}
            title="Explore Student Launches"
            description="Discover products built by students solving real world problems."
          />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ExplorePageContentWrapper searchParams={searchParams}/>
        </Suspense>
      </div>
    </section>
  );
}
