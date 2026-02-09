"use server";

import { cookies } from "next/headers";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/api";

export type CultivationBatch = {
  id: string;
  product_id: string;
  product_name: string;
  quantity_planted: number;
  quantity_harvested: number | null;
  harvest_rate: number | null;
  started_at: string;
  expected_harvest_at: string | null;
  status: "growing" | "harvested";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getCultivationBatches(status?: "growing" | "harvested") {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  const q = params.toString();
  const list = await apiGet<CultivationBatch[]>(
    `/api/cultivation_batches${q ? `?${q}` : ""}`,
    await getToken()
  );
  return list ?? [];
}

export async function createCultivationBatch(input: {
  product_name: string;
  quantity_planted: number;
  started_at?: string;
  expected_harvest_at?: string | null;
  notes?: string | null;
}) {
  const data = await apiPost<{ id: string }>(
    "/api/cultivation_batches",
    input,
    await getToken()
  );
  return data;
}

export async function updateCultivationBatch(
  id: string,
  input: Partial<{
    quantity_harvested: number;
    harvest_rate: number;
    status: "growing" | "harvested";
    notes: string | null;
  }>
) {
  await apiPatch(`/api/cultivation_batches/${id}`, input, await getToken());
}

export async function deleteCultivationBatch(id: string) {
  await apiDelete(`/api/cultivation_batches/${id}`, await getToken());
}
