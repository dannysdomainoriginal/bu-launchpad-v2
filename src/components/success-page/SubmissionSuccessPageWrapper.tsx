import { notFound, redirect } from "next/navigation";

import { SubmissionSuccessPage } from "./SubmissionSuccessPage";
import { getProductDetailsBySlug } from "@/modules/products/products.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function SubmissionSuccessPageWrapper({ params }: Props) {
  const { slug } = await params;
  const product = await getProductDetailsBySlug(slug);

  if (!product) {
    return notFound();
  }

  if (product.isApproved) {
    redirect(`/products/${product.slug}`);
  }

  return <SubmissionSuccessPage product={product} />;
}
