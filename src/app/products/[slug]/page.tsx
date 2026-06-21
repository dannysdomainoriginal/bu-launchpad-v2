import { Suspense } from "react";

import {
  ProductDetails,
  ProductDetailsSkeleton,
} from "@/modules/products/products.component";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ProductDetailsPage({ params }: Props) {
  return (
    <main className="pb-10 md:pb-20 pt-15 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}
