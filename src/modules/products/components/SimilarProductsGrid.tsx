import React from "react";
import { ProductWithTags } from "@/lib/db/schema";
import { getSimilarProducts } from "../products.service";
import ProductCard from "./ProductCard";
import { EmptySlate } from "@/components/ui/EmptySlate";

type Props = {
  product: ProductWithTags;
  tags: ProductWithTags["tags"];
};

export default async function SimilarProductsGrid({ product, tags }: Props) {
  const similarProducts = await getSimilarProducts(
    product.id,
    tags.map((t) => t.name),
  );

  return (
    <div>
      {similarProducts.length ? (
        <div className="grid-wrapper mt-8">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <EmptySlate message="No similar products found for this innovation." />
      )}
    </div>
  );
}
