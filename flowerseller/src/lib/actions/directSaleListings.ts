"use server";

import { cookies } from "next/headers";
import { apiGet, apiPatch } from "@/lib/api";

export type DirectSaleListing = {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
  delivery_option: "pickup_only" | "delivery_only" | "both";
  image_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getDirectSaleListings(): Promise<DirectSaleListing[]> {
  const list = await apiGet<DirectSaleListing[]>(
    "/api/direct_sale_listings",
    await getToken()
  );
  return list ?? [];
}

export async function updateDirectSaleListing(
  id: string,
  input: Partial<{
    product_name: string;
    price: number;
    quantity: number;
    delivery_option: "pickup_only" | "delivery_only" | "both";
    image_url: string | null;
    description: string | null;
  }>
) {
  await apiPatch(`/api/direct_sale_listings/${id}`, input, await getToken());
}
