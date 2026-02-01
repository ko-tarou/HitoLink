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
  const list = await apiGet<{ id: string; value: number; category_id: string | null; created_at: string; categories: { name: string } | null }[]>(
    "/api/price_adjustment_history",
    await getToken()
  );
  return list ?? [];
}

export async function applyBulkPriceAdjustment(input: {
  value: number;
  category_id?: string | null;
}) {
  const data = await apiPost<{ updated: number }>("/api/price_adjustment", input, await getToken());
  return data;
}
