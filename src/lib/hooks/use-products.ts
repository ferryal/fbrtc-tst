"use client";

import {
  useQuery,
  useSuspenseQuery,
  queryOptions,
} from "@tanstack/react-query";
import {
  getProducts,
  getProduct,
  getProductsByCategory,
  getCategories,
  searchProducts,
} from "../api/products";
import type { ProductsQueryParams, SortBy, SortOrder } from "../types/product";

// Query keys factory for consistent key management
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: ProductsQueryParams) =>
    [...productKeys.lists(), params] as const,
  byCategory: (
    category: string,
    params?: Omit<ProductsQueryParams, "category">,
  ) => [...productKeys.all, "category", category, params] as const,
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

// Helper hook for combined filters
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
