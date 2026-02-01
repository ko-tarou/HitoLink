"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Trash2 } from "lucide-react";
import { formatYen } from "@/lib/utils";
import { deleteProduct } from "@/lib/actions/products";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
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
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteClick = useCallback((e: React.MouseEvent, product: { id: string; name: string }) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteTarget(product);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      await deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
      router.refresh();
      const openId = searchParams.get("product_id");
      if (openId === deleteTarget.id) {
        const next = new URLSearchParams(searchParams.toString());
        next.delete("product_id");
        router.replace(next.toString() ? `/inventory?${next.toString()}` : "/inventory");
      }
    } finally {
      setDeletingId(null);
    }
  }, [deleteTarget, router, searchParams]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const openProductDialog = useCallback(
    (productId: string) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set("product_id", productId);
      router.replace(`/inventory?${next.toString()}`);
    },
    [router, searchParams]
  );

  const tableBody = (
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
          <td className="px-4 py-3 text-right border-r border-border text-text">{formatYen(p.base_price)}</td>
          <td className="px-4 py-3 text-center border-border w-14">
            <button
              type="button"
              onClick={(e) => handleDeleteClick(e, { id: p.id, name: p.name })}
              disabled={deletingId === p.id}
              className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-base-subtle disabled:opacity-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${p.name}を削除`}
              title="削除"
            >
              <Trash2 className="w-5 h-5" aria-hidden />
            </button>
          </td>
        </tr>
      ))}
      {products.length === 0 && (
        <tr>
          <td colSpan={6} className="px-4 py-8 text-text-muted text-center">
            商品がありません
          </td>
        </tr>
      )}
    </tbody>
  );

  const dialog =
    deleteTarget && typeof document !== "undefined"
      ? createPortal(
          <ConfirmDialog
            title="商品の削除"
            message={`「${deleteTarget.name}」を削除しますか？この操作は取り消せません。`}
            confirmLabel="削除する"
            cancelLabel="キャンセル"
            danger
            loading={deletingId === deleteTarget.id}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />,
          document.body
        )
      : null;

  return (
    <>
      {tableBody}
      {dialog}
    </>
  );
}
