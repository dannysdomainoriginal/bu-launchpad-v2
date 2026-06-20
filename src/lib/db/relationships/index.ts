import { products } from "../schemas/products";
import { productTags } from "../schemas/productTags";
import { relations } from "drizzle-orm";

export const productsRelations = relations(products, ({ many }) => ({
  tags: many(productTags),
}));

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
}));
