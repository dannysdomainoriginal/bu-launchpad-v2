import { db } from "@/lib/db";
import { InsertProductType, products } from "@/lib/db/schemas/products";
import { productTags } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
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
  cacheTag(`product:by-slug:${slug}`);

  const product = await db.query.products.findFirst({
    where: (products, { eq, and }) =>
      and(eq(products.slug, slug), eq(products.isApproved, true)),
    with: {
      tags: {
        columns: {
          name: true,
        },
      },
    },
  });

  if (product) {
    cacheTag(`product:by-id:${product.id}`);
  }

  return product;
}

/* -------------------------------------------------------------------------- */
/*                        GET METADATA DETAILS BY SLUG                        */
/* -------------------------------------------------------------------------- */
export async function getMetadataProduct(slug: string) {
  "use cache";
  cacheTag(`product:by-slug:${slug}`);

  return db.query.products.findFirst({
    where: (products, { eq, and }) =>
      and(eq(products.slug, slug), eq(products.isApproved, true)),
    columns: {
      name: true,
      description: true,
      image: true,
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                    GET PRODUCT DETAILS FOR SUCCESS PAGE                    */
/* -------------------------------------------------------------------------- */
export async function getProductDetailsBySlug(slug: string) {
  "use cache";
  cacheTag(`product:by-slug:${slug}`);

  return db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, slug),
    columns: {
      name: true,
      tagline: true,
      slug: true,
      description: true,
      image: true,
      liveUrl: true,
      isApproved: true,
    },
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
  revalidateTag(`product:by-slug:${updatedProduct.slug}`, "max");
  refresh();
}

/* -------------------------------------------------------------------------- */
/*                              GET ALL PRODUCTS                              */
/* -------------------------------------------------------------------------- */
type GetAllProductsParams = {
  limit?: number;
  offset?: number;
};

// used in admin page
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

/* -------------------------------------------------------------------------- */
/*                         GET ALL PRODUCTS WITH TAGS                         */
/* -------------------------------------------------------------------------- */
// used in explore page
export async function getAllProductsWithTags({
  limit = 50,
  offset = 0,
}: GetAllProductsParams) {
  "use cache";
  cacheLife("hours");
  cacheTag("products:list");

  return await db.query.products.findMany({
    where: (products, { eq }) => eq(products.isApproved, true),
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    limit,
    offset,
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
/*                 GET SIMILAR PRODUCTS USING AN ARRAY OF TAGS                */
/* -------------------------------------------------------------------------- */
type SimilarProductIdRow = {
  id: string;
};

export async function getSimilarProducts(productId: string, tags: string[]) {
  "use cache";
  cacheLife("hours");
  cacheTag(`products:similar:${productId}`);

  if (!tags.length) {
    return [];
  }

  const result = await db.execute<SimilarProductIdRow>(sql`
    SELECT
      p.id
    FROM products p
    JOIN product_tags pt
      ON p.id = pt.product_id
    WHERE pt.name IN (${sql.join(
      tags.map((tag) => sql`${tag}`),
      sql`, `,
    )})
      AND p.id != ${productId}
      AND p.is_approved = true
    GROUP BY p.id
    ORDER BY
      COUNT(pt.name) DESC,
      p.vote_count DESC
    LIMIT 3
  `);

  const productIds = result.rows.map((row) => row.id);

  if (!productIds.length) {
    return [];
  }

  return db.query.products.findMany({
    where: (products, { and, inArray, eq }) =>
      and(inArray(products.id, productIds), eq(products.isApproved, true)),
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
/*                           GET PRODUCTS BY USER ID                          */
/* -------------------------------------------------------------------------- */
export async function getProductsByUserId(
  userId: string,
  { limit = 50, offset = 0 }: GetAllProductsParams,
) {
  "use cache";
  cacheLife("hours");
  cacheTag(`products:list`);
  cacheTag(`products:user-id:${userId}`);

  return await db.query.products.findMany({
    where: (products, { eq, and }) =>
      and(eq(products.authorId, userId), eq(products.isApproved, true)),
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    limit,
    offset,
    with: {
      tags: {
        columns: {
          name: true,
        },
      },
    },
  });
}
