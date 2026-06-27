import { Suspense } from "react";

import {
  ProductDetailsWrapper,
  ProductDetailsSkeleton,
} from "@/modules/products/products.component";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

export async function generateStaticParams() {
  return db.select({ slug: products.slug }).from(products);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ProductDetailsPage({ params }: Props) {
  return (
    <main className="pb-8 sm:pb-10 pt-15 px-4 sm:px-6 lg:px-8 wrapper">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetailsWrapper params={params} />
      </Suspense>
    </main>
  );
}
