import { Sparkles } from "lucide-react";

import ProductCard from "@/modules/products/components/ProductCard";
import { EmptySlate } from "@/components/ui/EmptySlate";

export type ProductWithTags = {
  id: string;
  name: string;
  tagline: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  isApproved: boolean;
  image: string;
  liveUrl: string | null;
  voteCount: number;
  authorId: string;
  organizationId: string | null;
  authorName: string;
  authorAvatar: string;
  createdAt: Date;
  updatedAt: Date;
  tags: { name: string }[];
};

type Props = {
  products: ProductWithTags[];
};

export default function InnovationsTab({ products }: Props) {
  return (
    <>
      {products.length > 0 ? (
        <div className="grid-wrapper">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <EmptySlate
          message="You have not submitted any innovations yet or they may be awaiting approval."
          Icon={Sparkles}
        />
      )}
    </>
  );
}
