import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { cacheLife } from "next/cache";

type DashboardCounts = {
  feedback_count: string | number;
  collab_count: string | number;
  approved_product_count: string | number;
  pending_product_count: string | number;
};

async function runDashboardQuery(userId: string) {
  const { rows } = await db.execute<DashboardCounts>(sql`
    SELECT
      (
        SELECT COUNT(*)
        FROM product_feedback pf
        JOIN products p
          ON pf.product_id = p.id
        WHERE p.author_id = ${userId}
      ) AS feedback_count,

      (
        SELECT COUNT(*)
        FROM product_collaboration pc 
        JOIN products p
          ON pc.product_id = p.id
        WHERE p.author_id = ${userId}
      ) AS collab_count,

      product_counts.approved_product_count,
      product_counts.pending_product_count
    FROM (
      SELECT
        COUNT(*) FILTER (WHERE is_approved = true) AS approved_product_count,
        COUNT(*) FILTER (WHERE is_approved = false) AS pending_product_count
      FROM products
      WHERE author_id = ${userId}
    ) AS product_counts;
  `);

  return rows[0]!;
}

export async function getUserDashboardCounts(userId: string) {
  "use cache";
  cacheLife("minutes");

  // Call the decoupled query engine safely
  const row = await runDashboardQuery(userId);

  return {
    feedbackCount: Number(row.feedback_count),
    collabCount: Number(row.collab_count),
    approvedProductCount: Number(row.approved_product_count),
    pendingProductCount: Number(row.pending_product_count),
  };
}
