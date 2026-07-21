import { Suspense } from "react";
import type { Metadata } from "next";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { getProductMetadata } from "@/modules/products/products.service";
import {
  ProductDetailsWrapper,
  ProductDetailsSkeleton,
} from "@/modules/products/products.component";

/* -------------------------------------------------------------------------- */
/*                              GENERATE METADATA                             */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductMetadata(slug);

  if (!product) {
    return {
      title: "Product Not Found | BU Launchpad",
      description: "This product could not be found.",
    };
  }

  return {
    title: `${product.name} on BU Launchpad`,
    description: product.description,
    openGraph: {
      title: `${product.name} on BU Launchpad`,
      description: product.description,
      images: product.image
        ? [
            {
              url: product.image,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} on BU Launchpad`,
      description: product.description,
      images: product.image ? [product.image] : [],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                           GENERATE STATIC PARAMS                           */
/* -------------------------------------------------------------------------- */
export async function generateStaticParams() {
  return db.select({ slug: products.slug }).from(products);
}

/* -------------------------------------------------------------------------- */
/*                                  PROP TYPE                                 */
/* -------------------------------------------------------------------------- */
type Props = {
  params: Promise<{ slug: string }>;
};

/* -------------------------------------------------------------------------- */
/*                               PAGE COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function ProductDetailsPage({ params }: Props) {
  return (
    <main className="pb-8 sm:pb-10 pt-7 sm:pt-15 px-4 sm:px-6 lg:px-8 wrapper">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetailsWrapper params={params} />
      </Suspense>
    </main>
  );
}
