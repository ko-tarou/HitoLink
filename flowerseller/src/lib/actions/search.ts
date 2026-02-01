"use server";

import { cookies } from "next/headers";
import { apiGet } from "@/lib/api";

export async function searchProductsByText(
  query: string,
  limit = 20
): Promise<{ id: string; name: string; type: string; base_price: number; similarity: number }[]> {
  const store = await cookies();
  const token = store.get("auth")?.value ?? null;
  const list = await apiGet<{ id: string; name: string; type: string; base_price: number; similarity: number }[]>(
    `/api/search/products?q=${encodeURIComponent(query)}&limit=${limit}`,
    token
  );
  return list ?? [];
}
