"use cache";

import { notFound } from "next/navigation";

import { getProductBySlug } from "../products.service";
import { ProductsGridSkeleton } from "@/components/ui/ProductsGridSkeleton";
import ProductDetails from "./ProductDetails";
import { Suspense } from "react";
import SimilarProductsGrid from "./SimilarProductsGrid";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsWrapper({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const tags = product.tags ?? [];

  return (
    <>
      <ProductDetails product={product} tags={tags} />

      {/* Similar Products */}
      <section className="py-6 md:py-10">
        <h3 className="text-xl">People also viewed</h3>
        <Suspense fallback={<ProductsGridSkeleton count={3} />}>
          <SimilarProductsGrid product={product} tags={tags} />
        </Suspense>
      </section>
    </>
  )
}
