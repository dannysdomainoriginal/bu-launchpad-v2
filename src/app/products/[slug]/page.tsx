import { Suspense } from "react";

import {
  ProductDetailsWrapper,
  ProductDetailsSkeleton,
} from "@/modules/products/products.component";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { Metadata } from "next";
import { eq } from "drizzle-orm";

/* -------------------------------------------------------------------------- */
/*                              GENERATE METADATA                             */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    columns: {
      name: true,
      description: true,
      image: true,
    },
  });

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
