import React from "react";

import ExplorePageContent from "./ExplorePageContent";
import { getAllProductsWithTags } from "@/modules/products/products.service";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const PAGE_SIZE = 9;

export default async function ExplorePageContentWrapper({
  searchParams,
}: Props) {
  // * adding search feature
  // const page = Number((await searchParams).page ?? 1);
  // const products = await getAllProductsWithTags({
  //   limit: PAGE_SIZE,
  //   offset: (page - 1) * PAGE_SIZE,
  // });

  const products = await getAllProductsWithTags({});

  return <ExplorePageContent products={products} />;
}
