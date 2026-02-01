"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { formatYen } from "@/lib/utils";
import type { ProductType } from "@/types/database";

const typeLabel: Record<string, string> = {
  single: "単品",
  bundle: "束",
  arrangement: "アレンジ",
};

type ProductRow = {
  id: string;
  name: string;
  type: string;
  base_price: number;
  categories?: { name: string } | null;
};

interface InventoryTableBodyProps {
  products: ProductRow[];
  quantityByProductId: Record<string, number>;
}

export function InventoryTableBody({ products, quantityByProductId }: InventoryTableBodyProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openProductDialog = useCallback(
    (productId: string) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set("product_id", productId);
      router.replace(`/inventory?${next.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <tbody>
      {products.map((p) => (
        <tr
          key={p.id}
          role="button"
          tabIndex={0}
          onClick={() => openProductDialog(p.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openProductDialog(p.id);
            }
          }}
          className="border-b border-border hover:bg-base-subtle cursor-pointer focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary"
        >
          <td className="px-4 py-3 font-medium border-r border-border text-text">{p.name}</td>
          <td className="px-4 py-3 border-r border-border text-text">{typeLabel[p.type as ProductType] ?? p.type}</td>
          <td className="px-4 py-3 border-r border-border text-text">{p.categories?.name ?? "—"}</td>
          <td className="px-4 py-3 text-right border-r border-border text-text">
            {quantityByProductId[p.id] ?? 0}
          </td>
          <td className="px-4 py-3 text-right border-border text-text">{formatYen(p.base_price)}</td>
        </tr>
      ))}
      {products.length === 0 && (
        <tr>
          <td colSpan={5} className="px-4 py-8 text-text-muted text-center">
            商品がありません
          </td>
        </tr>
      )}
    </tbody>
  );
}
