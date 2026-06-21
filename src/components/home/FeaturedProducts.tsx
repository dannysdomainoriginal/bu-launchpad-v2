"use cache";

import Link from "next/link";

import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/button";
import { ProductCard } from "@/modules/products/products.component";
import { getFeaturedProducts } from "@/modules/products/products.service";
import { EmptySlate } from "../ui/EmptySlate";

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            Icon={StarIcon}
            description="Top picks from our community this week"
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

        {/* Card Grid */}
        {featuredProducts.length ? (
          <div className="grid-wrapper">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <EmptySlate
            message="No products launched in the last week. Check back soon for new launches"
            Icon={StarIcon}
          />
        )}
      </div>
    </section>
  );
}
