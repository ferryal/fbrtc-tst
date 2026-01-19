"use client";

import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from "@tanstack/react-query";
import {
  getProducts,
  getProduct,
  getProductsByCategory,
  getCategories,
  searchProducts,
} from "../api/products";
import type {
  ProductsQueryParams,
  ProductsResponse,
  SortBy,
  SortOrder,
} from "../types/product";

const PRODUCTS_PER_PAGE = 20;

// Query keys factory for consistent key management
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: ProductsQueryParams) =>
    [...productKeys.lists(), params] as const,
  infinite: (params: Omit<ProductsQueryParams, "limit" | "skip">) =>
    [...productKeys.all, "infinite", params] as const,
  byCategory: (
    category: string,
    params?: Omit<ProductsQueryParams, "category">,
  ) => [...productKeys.all, "category", category, params] as const,
  infiniteByCategory: (
    category: string,
    params?: Omit<ProductsQueryParams, "category" | "limit" | "skip">,
  ) => [...productKeys.all, "infinite-category", category, params] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  search: (query: string, params?: Omit<ProductsQueryParams, "search">) =>
    [...productKeys.all, "search", query, params] as const,
};

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all, "list"] as const,
};

// Query options for prefetching and SSR
export const productsQueryOptions = (params: ProductsQueryParams = {}) =>
  queryOptions({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    staleTime: 60 * 1000,
  });

export const productQueryOptions = (id: number) =>
  queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    staleTime: 60 * 1000,
  });

export const productsByCategoryOptions = (
  category: string,
  params: Omit<ProductsQueryParams, "category"> = {},
) =>
  queryOptions({
    queryKey: productKeys.byCategory(category, params),
    queryFn: () => getProductsByCategory(category, params),
    staleTime: 60 * 1000,
  });

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: categoryKeys.list(),
    queryFn: () => getCategories(),
    staleTime: 5 * 60 * 1000, // Categories rarely change
  });

// Infinite query options for pagination
export const infiniteProductsOptions = (
  params: Omit<ProductsQueryParams, "limit" | "skip"> = {},
) =>
  infiniteQueryOptions({
    queryKey: productKeys.infinite(params),
    queryFn: ({ pageParam = 0 }) =>
      getProducts({ ...params, limit: PRODUCTS_PER_PAGE, skip: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ProductsResponse) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: 60 * 1000,
  });

export const infiniteProductsByCategoryOptions = (
  category: string,
  params: Omit<ProductsQueryParams, "category" | "limit" | "skip"> = {},
) =>
  infiniteQueryOptions({
    queryKey: productKeys.infiniteByCategory(category, params),
    queryFn: ({ pageParam = 0 }) =>
      getProductsByCategory(category, {
        ...params,
        limit: PRODUCTS_PER_PAGE,
        skip: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ProductsResponse) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: 60 * 1000,
  });

// Client-side hooks
export function useProducts(params: ProductsQueryParams = {}) {
  return useQuery(productsQueryOptions(params));
}

export function useProduct(id: number) {
  return useQuery(productQueryOptions(id));
}

export function useProductsByCategory(
  category: string,
  params: Omit<ProductsQueryParams, "category"> = {},
) {
  return useQuery({
    ...productsByCategoryOptions(category, params),
    enabled: !!category,
  });
}

export function useCategories() {
  return useQuery(categoriesQueryOptions());
}

export function useSearchProducts(
  query: string,
  params: Omit<ProductsQueryParams, "search"> = {},
) {
  return useQuery({
    queryKey: productKeys.search(query, params),
    queryFn: () => searchProducts(query, params),
    enabled: query.length > 0,
    staleTime: 30 * 1000,
  });
}

// Infinite scroll hooks
export function useInfiniteProducts(
  params: Omit<ProductsQueryParams, "limit" | "skip"> = {},
) {
  return useInfiniteQuery(infiniteProductsOptions(params));
}

export function useInfiniteProductsByCategory(
  category: string,
  params: Omit<ProductsQueryParams, "category" | "limit" | "skip"> = {},
) {
  return useInfiniteQuery({
    ...infiniteProductsByCategoryOptions(category, params),
    enabled: !!category && category !== "all",
  });
}

// Combined infinite scroll hook with category support
export function useInfiniteFilteredProducts({
  category,
  sortBy,
  order,
}: {
  category?: string;
  sortBy?: SortBy;
  order?: SortOrder;
}) {
  const params = { sortBy, order };

  // If filtering by category, use category endpoint
  const categoryQuery = useInfiniteProductsByCategory(category || "", params);
  const allProductsQuery = useInfiniteProducts(params);

  // Return the appropriate query based on category
  if (category && category !== "all") {
    return categoryQuery;
  }

  return allProductsQuery;
}

// Suspense-enabled hooks for server components
export function useProductsSuspense(params: ProductsQueryParams = {}) {
  return useSuspenseQuery(productsQueryOptions(params));
}

export function useProductSuspense(id: number) {
  return useSuspenseQuery(productQueryOptions(id));
}

export function useCategoriesSuspense() {
  return useSuspenseQuery(categoriesQueryOptions());
}

// Helper hook for combined filters (non-infinite)
export function useFilteredProducts({
  category,
  sortBy,
  order,
  search,
  limit = 30,
  skip = 0,
}: {
  category?: string;
  sortBy?: SortBy;
  order?: SortOrder;
  search?: string;
  limit?: number;
  skip?: number;
}) {
  const params = { sortBy, order, limit, skip };

  // If searching, use search endpoint
  if (search && search.length > 0) {
    return useSearchProducts(search, params);
  }

  // If filtering by category, use category endpoint
  if (category && category !== "all") {
    return useProductsByCategory(category, params);
  }

  // Otherwise, fetch all products
  return useProducts(params);
}
