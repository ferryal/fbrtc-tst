import api from "./axios";
import type {
  Product,
  ProductsResponse,
  Category,
  ProductsQueryParams,
} from "../types/product";

/**
 * Fetch all products with optional filtering and sorting
 */
export async function getProducts(
  params: ProductsQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 30, skip = 0, sortBy, order, search } = params;

  let url = "/products";
  const queryParams = new URLSearchParams();

  if (search) {
    url = "/products/search";
    queryParams.append("q", search);
  }

  queryParams.append("limit", limit.toString());
  queryParams.append("skip", skip.toString());

  if (sortBy) {
    queryParams.append("sortBy", sortBy);
  }

  if (order) {
    queryParams.append("order", order);
  }

  const response = await api.get<ProductsResponse>(
    `${url}?${queryParams.toString()}`,
  );
  return response.data;
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(
  category: string,
  params: Omit<ProductsQueryParams, "category"> = {},
): Promise<ProductsResponse> {
  const { limit = 30, skip = 0, sortBy, order } = params;

  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit.toString());
  queryParams.append("skip", skip.toString());

  if (sortBy) {
    queryParams.append("sortBy", sortBy);
  }

  if (order) {
    queryParams.append("order", order);
  }

  const response = await api.get<ProductsResponse>(
    `/products/category/${category}?${queryParams.toString()}`,
  );
  return response.data;
}

/**
 * Fetch a single product by ID
 */
export async function getProduct(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

/**
 * Fetch all product categories
 */
export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/products/categories");
  return response.data;
}

/**
 * Fetch category list (slug names only)
 */
export async function getCategoryList(): Promise<string[]> {
  const response = await api.get<string[]>("/products/category-list");
  return response.data;
}

/**
 * Search products by query
 */
export async function searchProducts(
  query: string,
  params: Omit<ProductsQueryParams, "search"> = {},
): Promise<ProductsResponse> {
  return getProducts({ ...params, search: query });
}
