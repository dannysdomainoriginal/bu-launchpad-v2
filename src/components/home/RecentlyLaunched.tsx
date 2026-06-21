import Link from "next/link";

import { SectionHeader } from "../ui/SectionHeader";
import { ArrowUpRightIcon } from "lucide-react";
import { CalendarIcon, RocketIcon } from "lucide-react";
import { ProductCard } from "@/modules/products/products.component";
import { EmptySlate } from "../ui/EmptySlate";
import { getRecentlyUploaded } from "@/modules/products/products.service";
import { Button } from "../ui/button";

type Props = {};

export default async function RecentlyLaunchedProducts({}: Props) {
  const recentlyLaunched = await getRecentlyUploaded();

  return (
    <section className="py-20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Recently Launched"
            description="Discover the latest products from our community"
            Icon={RocketIcon}
          />
          <Button
            asChild
            variant="outline"
            className="cursor-pointer hidden sm:flex py-3 px-4"
          >
            <Link href="/explore">
              View All
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>

        {recentlyLaunched.length ? (
          <div className="grid-wrapper">
            {recentlyLaunched.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <EmptySlate
            message="No products launched in the last week. Check back soon for new launches"
            Icon={CalendarIcon}
          />
        )}
      </div>
    </section>
  );
}
