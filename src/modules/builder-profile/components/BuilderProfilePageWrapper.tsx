"use cache";

import { notFound } from "next/navigation";

import { getBuilderPageData } from "../builder-profile.service";
import { BackButton } from "@/components/ui/BackButton";
import BuilderProfileHeader from "./BuilderProfileHeader";
import BuilderProductsSection from "./BuilderProductsSection";

type Props = {
  params: Promise<{
    identifier: string;
  }>;
};

export default async function BuilderProfilePageWrapper({ params }: Props) {
  const { identifier } = await params;

  const page = await getBuilderPageData(identifier);

  // Clerk user not found
  if (!page) {
    notFound();
  }

  const { builder, profile, products, stats } = page;

  return (
    <>
      <BackButton/>
      <BuilderProfileHeader builder={builder} profile={profile} stats={stats} />
      <BuilderProductsSection builderName={builder.name} products={products} />
    </>
  );
}
