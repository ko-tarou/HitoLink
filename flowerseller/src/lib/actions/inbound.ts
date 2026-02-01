"use server";

import { cookies } from "next/headers";
import { apiGet, apiPost } from "@/lib/api";
import type { InboundStatus } from "@/types/database";

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getInboundRecords(limit = 30) {
  const list = await apiGet<unknown[]>(`/api/inbound_records`, await getToken());
  return list ?? [];
}

export async function createInboundRecord(input: {
  source_type?: string;
  raw_text?: string | null;
  image_url?: string | null;
  items: { product_id: string; quantity: number; unit_price?: number | null }[];
}) {
  const data = await apiPost<{ id: string }>("/api/inbound_records", {
    source_type: input.source_type ?? "ocr",
    raw_text: input.raw_text ?? null,
    image_url: input.image_url ?? null,
    items: input.items,
  }, await getToken());
  return data;
}

export async function createInboundFromOcr(input: {
  image_url?: string | null;
  raw_text?: string | null;
  items: { product_id: string; quantity: number; unit_price?: number | null }[];
}) {
  return createInboundRecord({
    source_type: "ocr",
    image_url: input.image_url ?? null,
    raw_text: input.raw_text ?? null,
    items: input.items,
  });
}
