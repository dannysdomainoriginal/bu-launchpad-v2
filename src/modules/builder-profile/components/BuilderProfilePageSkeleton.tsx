import { ProductsGridSkeleton } from "@/components/ui/ProductsGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function BuilderProfilePageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Skeleton className="h-24 w-24 rounded-full shrink-0 md:h-28 md:w-28" />

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-6 w-36 rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-5/6 max-w-md" />
            </div>

            <div className="flex gap-3 pt-1">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2 text-center">
              <Skeleton className="mx-auto h-8 w-16" />
              <Skeleton className="mx-auto h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <ProductsGridSkeleton count={3} />
      </div>
    </div>
  );
}
