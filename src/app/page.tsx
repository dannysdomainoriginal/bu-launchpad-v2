import { Suspense } from "react";

import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import RecentlyLaunchedProducts from "@/components/home/RecentlyLaunched";

import { ProductsSectionSkeleton } from "@/components/ui/ProductsGridSkeleton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RocketIcon, StarIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <Suspense
        fallback={
          <ProductsSectionSkeleton
            header={
              <div className="flex items-center justify-between mb-8">
                <SectionHeader
                  title="Featured Today"
                  description="Top picks from our community this week"
                  Icon={StarIcon}
                />
              </div>
            }
          />
        }
      >
        <FeaturedProducts />
      </Suspense>

      <Suspense
        fallback={
          <ProductsSectionSkeleton
            header={
              <SectionHeader
                title="Recently Launched"
                description="Discover the latest products from our community"
                Icon={RocketIcon}
              />
            }
          />
        }
      >
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}
