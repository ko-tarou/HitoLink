"use server";

import { cookies } from "next/headers";
import { apiGet, apiPost } from "@/lib/api";
import type { PaymentMethod } from "@/types/database";

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getSales(limit = 50) {
  const list = await apiGet<unknown[]>(`/api/sales`, await getToken());
  return list ?? [];
}

export async function createSale(input: {
  total_amount: number;
  payment_method: PaymentMethod;
  items: { product_id: string; quantity: number; unit_price: number }[];
}) {
  const data = await apiPost<{ id: string }>(`/api/sales`, input, await getToken());
  return data;
}
