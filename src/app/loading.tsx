import { SkeletonProductGrid } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Skeleton */}
      <section className="mb-12">
        <div className="text-center space-y-4">
          <div className="h-14 w-80 mx-auto animate-shimmer rounded-lg" />
          <div className="h-6 w-full max-w-2xl mx-auto animate-shimmer rounded-lg" />
          <div className="h-4 w-48 mx-auto animate-shimmer rounded-lg" />
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="mb-8">
        <div className="h-16 animate-shimmer rounded-2xl" />
      </section>

      {/* Products Grid Skeleton */}
      <section>
        <SkeletonProductGrid count={8} />
      </section>
    </div>
  );
}
