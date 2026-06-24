import React from "react";

import ExplorePageContent from "./ExplorePageContent";
import { getAllProductsWithTags } from "@/modules/products/products.service";

type Props = {
  searchParams: { page: string };
};

const PAGE_SIZE = 9;

export default async function ExplorePageContentWrapper({
  searchParams,
}: Props) {
  const page = Number(searchParams.page ?? 1);
  const products = await getAllProductsWithTags({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  return <ExplorePageContent products={products} />;
}
