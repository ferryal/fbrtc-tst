"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";
import { SkeletonCard } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useInfiniteFilteredProducts } from "@/lib/hooks/use-products";
import type { Product, Category, SortBy, SortOrder } from "@/lib/types/product";

interface InfiniteProductListProps {
  initialProducts: Product[];
  initialTotal: number;
  categories: Category[];
  category?: string;
  sortBy?: SortBy;
  order?: SortOrder;
}

export function InfiniteProductList({
  initialProducts,
  initialTotal,
  category,
  sortBy = "price",
  order = "asc",
}: InfiniteProductListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteFilteredProducts({
    category,
    sortBy,
    order,
  });

  // Flatten all pages into single products array
  const products =
    data?.pages.flatMap((page) => page.products) ?? initialProducts;
  const total = data?.pages[0]?.total ?? initialTotal;

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-error mb-4">Failed to load products</p>
        <p className="text-text-muted text-sm">{error?.message}</p>
      </div>
    );
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-24 h-24 mb-6 rounded-full bg-surface flex items-center justify-center">
          <svg
            className="w-12 h-12 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">
          No products found
        </h3>
        <p className="text-text-muted max-w-sm">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            index={index % 20} // Reset animation delay per page
            priority={index < 4}
          />
        ))}
      </motion.div>

      {/* Load More Trigger / Status */}
      <div ref={loadMoreRef} className="flex flex-col items-center gap-4 py-8">
        {isFetchingNextPage && (
          <div className="flex items-center gap-3 text-text-muted">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading more products...</span>
          </div>
        )}

        {!isFetchingNextPage && hasNextPage && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            className="min-w-[200px]"
          >
            Load More
          </Button>
        )}

        {/* Progress Indicator */}
        <p className="text-sm text-text-muted">
          Showing {products.length} of {total} products
        </p>

        {!hasNextPage && products.length > 0 && (
          <p className="text-sm text-text-subtle">
            You&apos;ve reached the end of the catalog
          </p>
        )}
      </div>
    </div>
  );
}
