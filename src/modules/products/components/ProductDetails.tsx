import Image from "next/image";
import { ArrowUpRight, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { Card } from "@/components/ui/card";
import { ProductWithTags } from "@/lib/db/schema";

import { ProductVoteButtonWrapper } from "@/modules/votes/votes.component";
import ProductFeedbackMessageBox from "@/modules/feedback/components/ProductFeedbackMessageBox";
import ProductCollaborationRequestBox from "@/modules/collaboration/components/ProductCollaborationRequestBox";

type Props = {
  product: ProductWithTags;
  tags: ProductWithTags["tags"];
};

export default function ProductDetails({ product, tags }: Props) {
  return (
    <div>
      {/* HEADER */}
      <div className="grid gap-6 border-b pb-6 md:pb-10 md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map(({ name }) => (
              <Badge key={name} variant="secondary">
                {name}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>

            <p className="text-lg text-muted-foreground">{product.tagline}</p>
          </div>

          <p className="text-sm text-muted-foreground">
            Built by {product.authorName} • Uploaded{" "}
            <RelativeTime date={product.createdAt} />
          </p>
        </div>

        <Card className="h-fit p-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>
                {product.voteCount === 0 ? (
                  "Be the first to upvote this project"
                ) : (
                  <>
                    {product.voteCount} student
                    {product.voteCount > 1 ? "s" : ""} support this project
                  </>
                )}
              </span>
            </div>

            {product.liveUrl && (
              <Button className="w-full py-5" asChild>
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                  <ArrowUpRight />
                </a>
              </Button>
            )}

            {/* Vote Button */}
            <ProductVoteButtonWrapper
              product={{
                id: product.id,
                slug: product.slug,
              }}
            />
          </div>
        </Card>
      </div>

      {/* BODY */}
      <div className="grid gap-10 border-b py-6 md:py-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-video">
              <Image
                alt={product.name}
                src={product.image}
                fill
                className="object-cover"
              />
            </div>
          </Card>

          <section>
            <h2 className="text-xl font-semibold">About this project</h2>

            <p className="whitespace-pre-line leading-7 text-muted-foreground">
              {product.description}
            </p>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="h-fit p-6">
            <div className="space-y-4">
              <Image
                alt={product.authorName}
                src={product.authorAvatar}
                width={80}
                height={80}
                className="rounded-full"
              />

              <div>
                <p className="font-medium">{product.authorName}</p>
                <p className="text-sm text-muted-foreground">Builder</p>
              </div>
            </div>
          </Card>

          {/* Feedback Feature */}
          <ProductFeedbackMessageBox productId={product.id} />
          <ProductCollaborationRequestBox productId={product.id} />
        </div>
      </div>
    </div>
  );
}
