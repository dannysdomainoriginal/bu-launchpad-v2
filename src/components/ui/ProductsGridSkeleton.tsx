import { Skeleton } from "./skeleton";

type Props = {
  header: React.ReactNode;
  count?: number;
};

export function ProductsSectionSkeleton({ header, count = 6 }: Props) {
  return (
    <section className="py-20">
      <div className="wrapper">
        {header}

        <div className="grid-wrapper mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <article key={index} className="bg-white/5 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden shadow-sm">
              {/* Image */}
              <Skeleton className="h-40 w-full rounded-none" />

              <div className="p-4">
                {/* Title */}
                <Skeleton className="h-5 w-3/4 rounded-md" />

                {/* Description */}
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>

                {/* Author + Votes */}
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-full" />

                    <div className="space-y-2">
                      <Skeleton className="h-3 w-20 rounded-md" />
                      <Skeleton className="h-3 w-28 rounded-md" />
                    </div>
                  </div>

                  <Skeleton className="h-4 w-12 rounded-md" />
                </div>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-3 border-t border-white/5">
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-20 rounded-md" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
