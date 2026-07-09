import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { InnovationItem } from "@/components/dashboard/types";

interface InnovationCardProps {
  innovation: InnovationItem;
}

const gradientMap = {
  primary: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
  blue: "linear-gradient(135deg, var(--chart-2) 0%, var(--chart-4) 100%)",
  orange: "linear-gradient(135deg, var(--chart-1) 0%, var(--chart-3) 100%)",
  pink: "linear-gradient(135deg, var(--chart-5) 0%, var(--primary) 100%)",
} as const;

export default function InnovationCard({ innovation }: InnovationCardProps) {
  return (
    <Card className="card-modern interactive overflow-hidden rounded-lg border-0 p-0">
      <div
        className="h-40 w-full"
        style={{ background: gradientMap[innovation.accent] }}
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground">{innovation.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {innovation.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {innovation.authorName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {innovation.authorName}
              </p>
              <p className="text-xs text-muted-foreground">
                {innovation.authorRole}
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-primary-light">
            ▲ {innovation.votes}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {innovation.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <div className="flex justify-end border-t border-border p-3">
        <Button className="rounded-md">View</Button>
      </div>
    </Card>
  );
}
