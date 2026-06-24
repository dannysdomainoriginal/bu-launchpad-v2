import React from "react";

import ExplorePageContent from "./ExplorePageContent";
import { getAllProductsWithTags } from "@/modules/products/products.service";

type Props = {};

export default async function ExplorePageContentWrapper({}: Props) {
  const products = await getAllProductsWithTags({});

  return <ExplorePageContent products={products} />;
}
