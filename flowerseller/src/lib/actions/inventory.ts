"use server";

import { cookies } from "next/headers";
import { apiGet, apiPost, apiPatch } from "@/lib/api";
import type { InventoryBatch } from "@/types/database";

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getInventoryBatches(opts?: {
  productId?: string;
  disposalBefore?: string;
}) {
  const params = new URLSearchParams();
  if (opts?.productId) params.set("product_id", opts.productId);
  if (opts?.disposalBefore) params.set("disposal_before", opts.disposalBefore);
  const q = params.toString();
  const list = await apiGet<(InventoryBatch & {
    products: { id: string; name: string; type: string; base_price: number } | null;
  })[]>(`/api/inventory_batches${q ? `?${q}` : ""}`, await getToken());
  return list ?? [];
}

export async function createInventoryBatch(input: {
  product_id: string;
  quantity: number;
  received_at?: string;
  disposal_date?: string | null;
  location?: string | null;
}) {
  const data = await apiPost<InventoryBatch>(`/api/inventory_batches`, input, await getToken());
  return data as InventoryBatch;
}

export async function updateInventoryBatch(
  id: string,
  input: Partial<{
    quantity: number;
    disposal_date: string | null;
    location: string | null;
  }>
) {
  await apiPatch(`/api/inventory_batches/${id}`, input, await getToken());
}
