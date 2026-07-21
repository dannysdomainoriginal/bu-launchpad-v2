import React from "react";

import { ProductCard } from "@/modules/products/components";
import { ProductWithTags } from "@/lib/db/schema";

type Props = {
  products: ProductWithTags[];
};

export default function ExplorePageContent({ products }: Props) {
  return (
    <>
      <div className="grid-wrapper">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}
