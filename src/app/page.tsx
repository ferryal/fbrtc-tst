import { Suspense } from "react";
import {
  getProducts,
  getProductsByCategory,
  getCategories,
} from "@/lib/api/products";
import { InfiniteProductList } from "@/components/products/infinite-product-list";
import { ProductFilters } from "@/components/products/product-filters";
import { SkeletonProductGrid } from "@/components/ui/skeleton";
import type { SortBy, SortOrder } from "@/lib/types/product";

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    sortBy?: SortBy;
    order?: SortOrder;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const { category, sortBy = "price", order = "asc" } = params;

  // Fetch categories and initial products in parallel
  const [categories, productsData] = await Promise.all([
    getCategories(),
    category && category !== "all"
      ? getProductsByCategory(category, { sortBy, order, limit: 20 })
      : getProducts({ sortBy, order, limit: 20 }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="gradient-text">Premium Products</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Discover our curated collection of high-quality products at
            unbeatable prices. Shop with confidence and enjoy fast shipping.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {productsData.total} Products
            </span>
            <span>•</span>
            <span>{categories.length} Categories</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mb-8">
        <Suspense
          fallback={<div className="h-16 animate-shimmer rounded-2xl" />}
        >
          <ProductFilters
            categories={categories}
            currentCategory={category}
            currentSortBy={sortBy}
            currentOrder={order}
          />
        </Suspense>
      </section>

      {/* Products Grid with Infinite Scroll */}
      <section>
        <Suspense fallback={<SkeletonProductGrid count={8} />}>
          <InfiniteProductList
            initialProducts={productsData.products}
            initialTotal={productsData.total}
            categories={categories}
            category={category}
            sortBy={sortBy}
            order={order}
          />
        </Suspense>
      </section>
    </div>
  );
}

// Enable ISR for the home page
export const revalidate = 60; // Revalidate every 60 seconds
