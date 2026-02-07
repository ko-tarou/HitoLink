"use server";

import { cookies } from "next/headers";
import { apiGet } from "@/lib/api";

export type MarketplaceListing = {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
  delivery_option: string;
  image_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  producer_id: string;
  producer_name: string;
};

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getMarketplaceListings(): Promise<MarketplaceListing[]> {
  try {
    const list = await apiGet<MarketplaceListing[]>(
      "/api/marketplace_listings",
      await getToken()
    );
    return list ?? [];
  } catch {
    return [];
  }
}
