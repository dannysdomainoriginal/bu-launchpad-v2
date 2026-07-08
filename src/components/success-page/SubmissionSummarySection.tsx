import Image from "next/image";

import type { ReactNode } from "react";

type SummaryRowProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

function SummaryRow({ label, value, className }: SummaryRowProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className={className}>{value}</div>
    </div>
  );
}

export type SubmissionSummarySectionProps = {
  product: {
    name: string;
    tagline: string;
    slug: string;
    description: string;
    image: string;
    liveUrl: string | null;
    isApproved: boolean;
    tags: { name: string }[];
  };
};

export default function SubmissionSummarySection({
  product,
}: SubmissionSummarySectionProps) {
  const tags = product.tags ?? [];

  return (
    <section className="mt-14 rounded-4xl border border-border/60 bg-card/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.24)] md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">
        Submission Summary
      </h2>

      <div className="mt-10 space-y-10">
        <SummaryRow
          label="Product Name"
          value={<p className="mt-2 text-lg font-medium">{product.name}</p>}
        />

        <SummaryRow
          label="Tagline"
          value={<p className="mt-2 text-zinc-200">{product.tagline}</p>}
        />

        <SummaryRow
          label="Slug"
          value={<p className="mt-2 font-mono text-primary">{product.slug}</p>}
        />

        <SummaryRow
          label="Description"
          value={
            <p className="mt-2 whitespace-pre-line leading-7 text-muted-foreground">
              {product.description}
            </p>
          }
        />

        {product.liveUrl ? (
          <SummaryRow
            label="Live URL"
            value={
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-primary underline underline-offset-4"
              >
                {product.liveUrl}
              </a>
            }
          />
        ) : null}

        <SummaryRow
          label="Tags"
          value={
            tags.length ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {tags.map(({ name }) => (
                  <span
                    key={name}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-muted-foreground">
                No tags attached yet.
              </p>
            )
          }
        />

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Product Image
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-border/50 bg-black">
            <div className="relative aspect-video w-full">
              <Image
                src={product.image}
                alt={`${product.name} preview`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
