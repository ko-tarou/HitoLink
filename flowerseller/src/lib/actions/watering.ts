"use server";

import { cookies } from "next/headers";
import { apiGet, apiPost } from "@/lib/api";

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getWateringRecords(opts?: {
  inventory_batch_id?: string;
  nextWateringBefore?: string;
}) {
  const params = new URLSearchParams();
  if (opts?.inventory_batch_id) params.set("inventory_batch_id", opts.inventory_batch_id);
  if (opts?.nextWateringBefore) params.set("next_watering_before", opts.nextWateringBefore);
  const q = params.toString();
  const list = await apiGet<unknown[]>(`/api/watering_records${q ? `?${q}` : ""}`, await getToken());
  return list ?? [];
}

export async function createWateringRecord(input: {
  inventory_batch_id: string;
  next_watering_at?: string | null;
}) {
  const data = await apiPost<{ id: string }>("/api/watering_records", input, await getToken());
  return data;
}
