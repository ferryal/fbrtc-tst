import { SkeletonProductDetail } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Skeleton */}
      <nav className="mb-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 animate-shimmer rounded" />
          <div className="h-4 w-4 animate-shimmer rounded" />
          <div className="h-4 w-20 animate-shimmer rounded" />
          <div className="h-4 w-4 animate-shimmer rounded" />
          <div className="h-4 w-32 animate-shimmer rounded" />
        </div>
      </nav>

      {/* Product Detail Skeleton */}
      <SkeletonProductDetail />
    </div>
  );
}
