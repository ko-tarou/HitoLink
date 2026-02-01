"use server";

import { cookies } from "next/headers";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/api";
import type { Product, ProductType } from "@/types/database";

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getProducts(opts?: {
  type?: ProductType;
  categoryId?: string;
  sortBy?: "name" | "updated_at" | "base_price";
  order?: "asc" | "desc";
}) {
  const params = new URLSearchParams();
  if (opts?.sortBy) params.set("sort_by", opts.sortBy);
  if (opts?.order) params.set("order", opts.order);
  if (opts?.type) params.set("type", opts.type);
  if (opts?.categoryId) params.set("category_id", opts.categoryId);
  const q = params.toString();
  const list = await apiGet<(Product & { categories: { name: string } | null })[]>(
    `/api/products${q ? `?${q}` : ""}`,
    await getToken()
  );
  return list ?? [];
}

export async function getProduct(id: string) {
  const data = await apiGet<Product & { categories: { name: string } | null }>(
    `/api/products/${id}`,
    await getToken()
  );
  return data;
}

export async function createProduct(input: {
  name: string;
  type: ProductType;
  category_id?: string | null;
  base_price: number;
  description?: string | null;
  disposal_days?: number | null;
}) {
  const data = await apiPost<{ id: string }>(`/api/products`, input, await getToken());
  return data as unknown as Product;
}

export async function updateProduct(
  id: string,
  input: Partial<{
    name: string;
    type: ProductType;
    category_id: string | null;
    base_price: number;
    description: string | null;
    disposal_days: number | null;
  }>
) {
  await apiPatch(`/api/products/${id}`, input, await getToken());
}

export async function deleteProduct(id: string) {
  await apiDelete(`/api/products/${id}`, await getToken());
}
