"use server";

import { cookies } from "next/headers";
import { apiGet } from "@/lib/api";

async function getToken() {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getCategories() {
  const list = await apiGet<{ id: string; name: string; parent_id: string | null; sort_order: number }[]>(
    "/api/categories",
    await getToken()
  );
  return list ?? [];
}
