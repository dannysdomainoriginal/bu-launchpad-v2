import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProductOverviewItem } from "@/components/dashboard/types";

interface ProductOverviewCardProps {
  product: ProductOverviewItem;
}

export default function ProductOverviewCard({
  product,
}: ProductOverviewCardProps) {
  return (
    <Card className="card-modern rounded-lg border-0 p-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.tagline}
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full">
            {product.status}
          </Badge>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button className="rounded-md bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(114,0,224,0.2),0_0_20px_rgba(114,0,224,0.35)]">
            {product.ctaPrimary}
          </Button>
          <Button variant="outline" className="rounded-md">
            {product.ctaSecondary}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
