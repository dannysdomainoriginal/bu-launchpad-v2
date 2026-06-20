import { db } from "@/lib/db";
import { ourProductsDb } from "@/lib/db/products";
import { InsertProductType, products } from "@/lib/db/schemas/products";
import { productTags } from "@/lib/db/schemas/productTags";
import { cacheTag } from "next/cache";
import { cacheLife } from "next/cache";

/* -------------------------------------------------------------------------- */
/*                            GET FEATURED PRODUCTS                           */
/* -------------------------------------------------------------------------- */
export async function getFeaturedProducts() {
  "use cache";
  cacheLife("hours");

  const result = await db.query.products
    .findMany({
      where: (products, { eq }) => eq(products.isApproved, true),
      orderBy: (products, { desc }) => [
        desc(products.isFeatured), // 1. Prioritize rows where isFeatured is true
        desc(products.voteCount), // 2. Break ties or top-off sorting using voteCount
      ],
      limit: 6,
      with: {
        tags: {
          columns: {
            name: true, // Only fetch the tag string name, skip IDs
          },
        },
      },
    })
    .catch(() => {});

  return (
    result ||
    ourProductsDb.sort((a, b) => b.voteCount - a.voteCount).slice(0, 6)
  );
}

/* -------------------------------------------------------------------------- */
/*                       GET RECENTLY UPLOADED PRODUCTS                       */
/* -------------------------------------------------------------------------- */
export async function getRecentlyUploaded() {
  "use cache";
  cacheLife("hours");

  const result = await db.query.products
    .findMany({
      where: (products, { eq }) => eq(products.isApproved, true),
      orderBy: (products, { desc }) => [desc(products.createdAt)],
      limit: 9,
      with: {
        tags: {
          columns: {
            name: true,
          },
        },
      },
    })
    .catch(() => {});

  return (
    result ||
    ourProductsDb
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 9)
  );
}

/* -------------------------------------------------------------------------- */
/*                             GET PRODUCT BY SLUG                            */
/* -------------------------------------------------------------------------- */
export async function getProductBySlug(slug: string) {
  "use cache";
  cacheTag(`product:${slug}`);

  const result = await db.query.products
    .findFirst({
      where: (products, { eq, and }) =>
        and(eq(products.slug, slug), eq(products.isApproved, true)),
      with: {
        tags: {
          columns: {
            name: true,
          },
        },
      },
    })
    .catch(() => {});

  return result || ourProductsDb.find((product) => product.slug === slug);
}

/* -------------------------------------------------------------------------- */
/*                             INSERT NEW PRODUCT                             */
/* -------------------------------------------------------------------------- */
interface ProductType extends InsertProductType {
  id: string;
}

export async function insertNewProduct(
  productValues: ProductType,
  tags: string[],
) {
  try {
    await db.insert(products).values(productValues);

    if (tags.length) {
      await db.insert(productTags).values(
        tags.map((tag) => ({
          productId: productValues.id,
          name: tag,
        })),
      );
    }

    return { success: true } as const;
  } catch (err: any) {
    // properly intercept duplicate errors and pgsql errors and parse error messages to outside world
    return { error: err.message as string } as const;
  }
}
