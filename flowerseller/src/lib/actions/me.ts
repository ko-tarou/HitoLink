"use server";

import { cookies } from "next/headers";
import { apiGet, apiPatch } from "@/lib/api";

export type Me = {
  organization_name: string;
  business_type: string;
};

export async function getMe(): Promise<Me | null> {
  const store = await cookies();
  const token = store.get("auth")?.value ?? null;
  if (!token) return null;
  try {
    return await apiGet<Me>("/api/me", token);
  } catch {
    return null;
  }
}

export async function updateMe(body: {
  password?: string;
  business_type?: string;
}): Promise<{ error?: string }> {
  const store = await cookies();
  const token = store.get("auth")?.value ?? null;
  if (!token) return { error: "ログインしてください" };
  try {
    await apiPatch("/api/me", body, token);
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "更新に失敗しました" };
  }
}
