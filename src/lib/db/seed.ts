import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { products, productTags } from "./schema";
import { ourProductsDb } from "./products";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("🌱 Seeding database...");

  await db.delete(products);
  console.log("✅ Cleared existing data");

  // Insert products and their tags safely
  for (const product of ourProductsDb) {
    try {
      await db.insert(products).values({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        isFeatured: product.isFeatured,
        isApproved: product.isApproved,
        image: product.image,
        liveUrl: product.liveUrl,
        voteCount: product.voteCount,
        authorId: product.authorId,
        authorName: product.authorName,
        authorAvatar: product.authorAvatar,
        organizationId: product.organizationId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });

      if (product.tags && product.tags.length > 0) {
        for (const tag of product.tags) {
          await db.insert(productTags).values({
            productId: product.id,
            name: tag.name,
          });
        }
      }

      console.log(
        `✅ Added product: ${product.name} (${product.voteCount} votes) with ${product.tags.length} tags`,
      );
    } catch (error) {
      console.error(`❌ Failed to insert ${product.name}. Error:`, error);
      // If the product fails to insert, it won't attempt to insert its tags
    }
  }

  // Verify inserted products
  const insertedCount = await db.$count(products);
  console.log(`\n🎉 Successfully seeded ${insertedCount} products!`);
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("\n✨ Seeding complete!");
    process.exit(0);
  });
