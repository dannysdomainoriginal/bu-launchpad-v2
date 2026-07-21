import { Card } from "@/components/ui/card";
import { EmptySlate } from "@/components/ui/EmptySlate";
import { ProductCard } from "@/modules/products/components";
import { RocketIcon } from "lucide-react";

import type { ProductWithTags } from "@/lib/db/schema";

type Props = {
  builderName: string;
  products: ProductWithTags[];
};

export default function BuilderProductsSection({
  builderName,
  products,
}: Props) {
  return (
    <section className="mt-12 space-y-6">
      <div className="mb-12">
        <h2 className="text-2xl font-bold">Built by {builderName}</h2>

        <p className="mt-1 text-muted-foreground">
          Explore the innovations this builder has shared with the community.
        </p>
      </div>

      {products.length ? (
        <div className="grid-wrapper">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <Card className="py-8">
          <EmptySlate
            Icon={RocketIcon}
            message={`${builderName} hasn't launched any innovations yet.`}
          />
        </Card>
      )}
    </section>
  );
}
