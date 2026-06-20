import { db } from "@/lib/db";
import { ourProductsDb } from "@/lib/db/products";
import { InsertProductType, products } from "@/lib/db/schemas/products";
import { productTags } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { cacheTag, refresh, revalidateTag } from "next/cache";
import { cacheLife } from "next/cache";

/* -------------------------------------------------------------------------- */
/*                            GET FEATURED PRODUCTS                           */
/* -------------------------------------------------------------------------- */
export async function getFeaturedProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("featured-products");

  return await db.query.products.findMany({
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
  });
}

/* -------------------------------------------------------------------------- */
/*                       GET RECENTLY UPLOADED PRODUCTS                       */
/* -------------------------------------------------------------------------- */
export async function getRecentlyUploaded() {
  "use cache";
  cacheLife("hours");
  cacheTag("recently-launched");

  return await db.query.products.findMany({
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
  });
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
  await db.insert(products).values(productValues);

  if (tags.length) {
    await db.insert(productTags).values(
      tags.map((tag) => ({
        productId: productValues.id,
        name: tag,
      })),
    );
  }

  revalidateTag("products:list", "max");
  revalidateTag("recently-launched", "max");
}

/* -------------------------------------------------------------------------- */
/*                              APPROVE A PRODUCT                             */
/* -------------------------------------------------------------------------- */
export async function approveProduct(id: string) {
  const [updatedProduct] = await db
    .update(products)
    .set({ isApproved: true })
    .where(eq(products.id, id))
    .returning();

  if (!updatedProduct) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  revalidateTag("products:list", "max");
  revalidateTag("recently-launched", "max");
  revalidateTag(`product:${updatedProduct.slug}`, "max");
  refresh();
}

/* -------------------------------------------------------------------------- */
/*                              GET ALL PRODUCTS                              */
/* -------------------------------------------------------------------------- */
type GetAllProductsParams = {
  limit: number;
  offset: number;
};

export async function getAllProducts({
  limit = 50,
  offset = 0,
}: GetAllProductsParams) {
  "use cache";
  cacheLife("hours");
  cacheTag("products:list");

  // skip tags
  return db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(limit)
    .offset(offset);
}
