"use server";

import { cookies } from "next/headers";
import { apiGet } from "@/lib/api";

export type ShipmentItem = {
  id: string;
  product_name: string;
  quantity: number;
};

export type Shipment = {
  id: string;
  shipped_at: string;
  destination: string | null;
  notes: string | null;
  created_at: string;
  items: ShipmentItem[];
};

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getShipments(): Promise<Shipment[]> {
  const list = await apiGet<Shipment[]>(`/api/shipments`, await getToken());
  return list ?? [];
}
