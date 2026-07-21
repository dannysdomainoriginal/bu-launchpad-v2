import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-32" />

      <div className="space-y-2">
        <Skeleton className="h-12 w-96" />
        <Skeleton className="h-6 w-64" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Skeleton className="aspect-video w-full rounded-xl" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>

        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}
