"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SortBy = "name" | "updated_at" | "base_price";
type Order = "asc" | "desc";

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "name", label: "名前" },
  { value: "updated_at", label: "更新日時" },
  { value: "base_price", label: "価格" },
];

interface InventoryFiltersProps {
  categories: { id: string; name: string }[];
}

export function InventoryFilters({ categories }: InventoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category_id") ?? "";
  const sortBy = (searchParams.get("sort_by") as SortBy) ?? "name";
  const order = (searchParams.get("order") as Order) ?? "asc";

  const updateParams = useCallback(
    (updates: { category_id?: string; sort_by?: string; order?: string }) => {
      const next = new URLSearchParams(searchParams.toString());
      if (updates.category_id !== undefined) {
        if (updates.category_id) next.set("category_id", updates.category_id);
        else next.delete("category_id");
      }
      if (updates.sort_by !== undefined) {
        if (updates.sort_by) next.set("sort_by", updates.sort_by);
        else next.delete("sort_by");
      }
      if (updates.order !== undefined) {
        if (updates.order) next.set("order", updates.order);
        else next.delete("order");
      }
      router.push(`/inventory${next.toString() ? `?${next.toString()}` : ""}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4" role="group" aria-label="フィルタとソート">
      <div className="flex items-center gap-2">
        <label htmlFor="inventory-category" className="text-sm font-medium text-text">
          カテゴリ
        </label>
        <select
          id="inventory-category"
          value={categoryId}
          onChange={(e) => updateParams({ category_id: e.target.value })}
          className="rounded-lg border border-border bg-base px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
          aria-label="カテゴリでフィルタ"
        >
          <option value="">すべて</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="inventory-sort" className="text-sm font-medium text-text">
          並び順
        </label>
        <select
          id="inventory-sort"
          value={sortBy}
          onChange={(e) => updateParams({ sort_by: e.target.value })}
          className="rounded-lg border border-border bg-base px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
          aria-label="ソート項目"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          id="inventory-order"
          value={order}
          onChange={(e) => updateParams({ order: e.target.value })}
          className="rounded-lg border border-border bg-base px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
          aria-label="昇順・降順"
        >
          <option value="asc">昇順</option>
          <option value="desc">降順</option>
        </select>
      </div>
    </div>
  );
}
