import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as relations from "./relationships";
import { products } from "./schemas/products";
import { productTags } from "./schemas/productTags";
import { votes } from "./schemas/votes";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({
  client: sql,
  schema: {
    products,
    productTags,
    votes,
    ...relations,
  },
});
