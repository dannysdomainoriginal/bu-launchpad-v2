"use cache";

import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { getProductBySlug } from "../products.service";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const tags = product.tags ?? [];

  return (
    <div className="space-y-5">
      <div className="space-y-2 flex justify-between flex-col md:flex-row pb-5 border-b-2 border-muted">
        <div>
          <div className="flex items-center gap-2">
            {tags.map(({ name }) => (
              <span
                key={name}
                className="py-2 px-4 rounded-sm bg-accent text-accent-foreground"
              >
                {name}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>
          <p className="text-base text-accent-foreground">
            {product.tagline}
          </p>
          <span className="text-sm text-muted-foreground">
            Built by {product.authorName} • Uploaded at{" "}
            <RelativeTime date={product.createdAt} />
          </span>
        </div>

        {/* ACTIONS COMPONENT */}
        <div className="bg-accent p-5 border-2 rounded-2xl border-accent-foreground">
          <p className="text-accent-foreground">🔥 {product.voteCount} students support this</p>
        </div>
      </div>
      <div className="relative w-7xl h-180">
        <Image alt={product.name} src={product.image} fill />
      </div>
    </div>
  );
}
