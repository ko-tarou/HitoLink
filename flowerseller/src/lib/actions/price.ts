"use server";

import { cookies } from "next/headers";
import { apiGet, apiPost } from "@/lib/api";

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getCategories() {
  const list = await apiGet<{ id: string; name: string }[]>("/api/categories", await getToken());
  return list ?? [];
}

export async function getPriceAdjustmentHistory(limit = 30) {
  const list = await apiGet<
    {
      id: string;
      adjustment_type?: string;
      value: number;
      category_id: string | null;
      product_id?: string | null;
      created_at: string;
      categories: { name: string } | null;
      products?: { name: string } | null;
    }[]
  >("/api/price_adjustment_history", await getToken());
  return list ?? [];
}

/** 価格調整を実行。scope=product のとき product_id、scope=category のとき category_id を指定 */
export async function applyPriceAdjustment(input: {
  scope: "all" | "category" | "product";
  product_id?: string | null;
  category_id?: string | null;
  value: number;
  unit: "percent" | "yen";
  operation: "increase" | "decrease" | "multiply" | "discount";
}) {
  const data = await apiPost<{ updated: number }>("/api/price_adjustment", input, await getToken());
  return data;
}
