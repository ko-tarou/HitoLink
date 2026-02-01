"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { formatYen, formatDate, formatDateTime } from "@/lib/utils";
import { getProduct } from "@/lib/actions/products";
import { getInventoryBatches, updateInventoryBatch } from "@/lib/actions/inventory";
import { getSales } from "@/lib/actions/sales";
import { getWateringRecords } from "@/lib/actions/watering";
import { getCategories } from "@/lib/actions/categories";
import { updateProduct } from "@/lib/actions/products";
import type { ProductType } from "@/types/database";
import { btn, inputBase, selectBase, labelMuted } from "@/lib/ui-classes";

const typeLabel: Record<string, string> = {
  single: "単品",
  bundle: "束",
  arrangement: "アレンジ",
};

type ProductDetail = Awaited<ReturnType<typeof getProduct>>;
type BatchItem = {
  id: string;
  product_id: string;
  quantity: number;
  received_at: string;
  disposal_date: string | null;
  location: string | null;
  products?: { name: string };
};
type SaleItem = {
  id: string;
  total_amount: number;
  payment_method: string;
  created_at: string;
  sale_items?: { product_id: string; quantity: number; unit_price: number; subtotal: number; products?: { name: string } }[];
};
type WateringItem = {
  id: string;
  inventory_batch_id: string;
  watered_at: string;
  next_watering_at: string | null;
  created_at: string;
};

export function ProductDetailDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product_id");

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [salesForProduct, setSalesForProduct] = useState<SaleItem[]>([]);
  const [wateringForProduct, setWateringForProduct] = useState<WateringItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [formProduct, setFormProduct] = useState<Partial<{ name: string; type: string; category_id: string; base_price: number; description: string; disposal_days: number }>>({});
  const [formBatch, setFormBatch] = useState<Partial<{ quantity: number; disposal_date: string; location: string }>>({});

  const closeDialog = useCallback(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("product_id");
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  }, [router, pathname, searchParams]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
    };
    if (productId) {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [productId, closeDialog]);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      getProduct(productId),
      getInventoryBatches({ productId }),
      getSales(),
      getWateringRecords(),
      getCategories(),
    ])
      .then(([p, bList, salesList, wateringList, cats]) => {
        if (!p) {
          setError("商品が見つかりません");
          return;
        }
        setProduct(p);
        setBatches((bList ?? []) as BatchItem[]);
        setCategories(cats ?? []);
        setFormProduct({
          name: p.name,
          type: p.type,
          category_id: p.category_id ?? "",
          base_price: p.base_price,
          description: p.description ?? "",
          disposal_days: (p as { disposal_days?: number }).disposal_days ?? 0,
        });
        const batchIds = new Set((bList ?? []).map((b: { id: string }) => b.id));
        const salesFiltered = (salesList ?? []).filter((s: SaleItem) =>
          s.sale_items?.some((i: { product_id: string }) => i.product_id === productId)
        );
        setSalesForProduct(salesFiltered as SaleItem[]);
        const wateringFiltered = (wateringList ?? []).filter((w: WateringItem) =>
          batchIds.has(w.inventory_batch_id)
        );
        setWateringForProduct(wateringFiltered as WateringItem[]);
      })
      .catch((e) => setError(e?.message ?? "読み込みに失敗しました"))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !product) return;
    try {
      await updateProduct(productId, {
        name: formProduct.name ?? product.name,
        type: (formProduct.type as ProductType) ?? product.type,
        category_id: formProduct.category_id || null,
        base_price: formProduct.base_price ?? product.base_price,
        description: formProduct.description ?? product.description ?? null,
        disposal_days: formProduct.disposal_days ?? (product as { disposal_days?: number }).disposal_days ?? null,
      });
      const updated = await getProduct(productId);
      if (updated) setProduct(updated);
      setEditingProduct(false);
    } catch (err) {
      setError((err as Error)?.message ?? "保存に失敗しました");
    }
  };

  const handleSaveBatch = async (e: React.FormEvent, batchId: string) => {
    e.preventDefault();
    const b = batches.find((x) => x.id === batchId);
    if (!b) return;
    try {
      await updateInventoryBatch(batchId, {
        quantity: formBatch.quantity ?? b.quantity,
        disposal_date: formBatch.disposal_date || null,
        location: formBatch.location ?? b.location ?? null,
      });
      const bList = await getInventoryBatches({ productId: productId! });
      setBatches((bList ?? []) as BatchItem[]);
      setEditingBatchId(null);
      setFormBatch({});
    } catch (err) {
      setError((err as Error)?.message ?? "保存に失敗しました");
    }
  };

  const currentQuantity = batches.reduce((sum, b) => sum + b.quantity, 0);

  if (!productId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-dialog-title"
      onClick={(e) => e.target === e.currentTarget && closeDialog()}
    >
      <div
        className="bg-base rounded-xl border-2 border-border shadow-xl max-h-[90vh] w-full max-w-2xl overflow-hidden flex flex-col text-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー: 8pxグリッド・余白統一 */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border shrink-0 bg-base">
          <h2 id="product-dialog-title" className="text-xl font-bold text-text m-0">
            商品詳細
          </h2>
          <button
            type="button"
            onClick={closeDialog}
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 border-border bg-base-subtle text-text hover:bg-base-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="閉じる"
          >
            <X className="w-6 h-6" aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-8">
          {loading && (
            <p className="text-base text-text-muted py-4" role="status">
              読み込み中...
            </p>
          )}
          {error && (
            <div
              className="rounded-lg border-2 border-error bg-error-light px-4 py-3 text-base text-error font-medium"
              role="alert"
            >
              {error}
            </div>
          )}
          {!loading && product && (
            <>
              {/* 基本情報 */}
              <section aria-labelledby="detail-basic" className="space-y-3">
                <h3 id="detail-basic" className="text-base font-semibold text-text mb-3">
                  基本情報
                </h3>
                {!editingProduct ? (
                  <div className="rounded-xl border-2 border-border bg-base-subtle overflow-hidden">
                    <table className="w-full text-sm text-left border-collapse">
                      <tbody className="text-text">
                        <tr className="border-b border-border">
                          <th scope="row" className="px-4 py-3 w-40 font-semibold text-text bg-base-muted/50 border-r border-border">
                            名前
                          </th>
                          <td className="px-4 py-3">{product.name}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <th scope="row" className="px-4 py-3 font-semibold text-text bg-base-muted/50 border-r border-border">
                            種別
                          </th>
                          <td className="px-4 py-3">{typeLabel[product.type as ProductType] ?? product.type}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <th scope="row" className="px-4 py-3 font-semibold text-text bg-base-muted/50 border-r border-border">
                            カテゴリ
                          </th>
                          <td className="px-4 py-3">{(product as { categories?: { name: string } }).categories?.name ?? "—"}</td>
                        </tr>
                        <tr className="border-b border-border">
                          <th scope="row" className="px-4 py-3 font-semibold text-text bg-base-muted/50 border-r border-border">
                            価格
                          </th>
                          <td className="px-4 py-3">{formatYen(product.base_price)}</td>
                        </tr>
                        {(product as { description?: string }).description && (
                          <tr className="border-b border-border">
                            <th scope="row" className="px-4 py-3 font-semibold text-text bg-base-muted/50 border-r border-border">
                              説明
                            </th>
                            <td className="px-4 py-3">{(product as { description?: string }).description}</td>
                          </tr>
                        )}
                        <tr className="border-b border-border">
                          <th scope="row" className="px-4 py-3 font-semibold text-text bg-base-muted/50 border-r border-border">
                            品質管理日数
                          </th>
                          <td className="px-4 py-3">{(product as { disposal_days?: number }).disposal_days ?? "—"}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="px-4 py-3 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(true)}
                        className={btn.secondary}
                      >
                        編集
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProduct} className="rounded-xl border-2 border-border bg-base-subtle p-6 space-y-4">
                    <div>
                      <label htmlFor="product-name" className={labelMuted}>名前</label>
                      <input
                        id="product-name"
                        type="text"
                        value={formProduct.name ?? ""}
                        onChange={(e) => setFormProduct((f) => ({ ...f, name: e.target.value }))}
                        className={inputBase}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label htmlFor="product-type" className={labelMuted}>種別</label>
                      <select
                        id="product-type"
                        value={formProduct.type ?? ""}
                        onChange={(e) => setFormProduct((f) => ({ ...f, type: e.target.value }))}
                        className={selectBase}
                      >
                        {Object.entries(typeLabel).map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="product-category" className={labelMuted}>カテゴリ</label>
                      <select
                        id="product-category"
                        value={formProduct.category_id ?? ""}
                        onChange={(e) => setFormProduct((f) => ({ ...f, category_id: e.target.value }))}
                        className={selectBase}
                      >
                        <option value="">—</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="product-price" className={labelMuted}>価格（円）</label>
                      <input
                        id="product-price"
                        type="number"
                        min={0}
                        step={1}
                        value={formProduct.base_price ?? 0}
                        onChange={(e) => setFormProduct((f) => ({ ...f, base_price: Number(e.target.value) }))}
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label htmlFor="product-description" className={labelMuted}>説明</label>
                      <input
                        id="product-description"
                        type="text"
                        value={formProduct.description ?? ""}
                        onChange={(e) => setFormProduct((f) => ({ ...f, description: e.target.value }))}
                        className={inputBase}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label htmlFor="product-disposal-days" className={labelMuted}>品質管理日数</label>
                      <input
                        id="product-disposal-days"
                        type="number"
                        min={0}
                        value={formProduct.disposal_days ?? ""}
                        onChange={(e) => setFormProduct((f) => ({ ...f, disposal_days: e.target.value ? Number(e.target.value) : 0 }))}
                        className={inputBase}
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-border">
                      <button type="submit" className={btn.primary}>保存</button>
                      <button type="button" onClick={() => setEditingProduct(false)} className={btn.secondary}>
                        キャンセル
                      </button>
                    </div>
                  </form>
                )}
              </section>

              {/* 現在ある量 */}
              <section aria-labelledby="detail-quantity" className="space-y-2">
                <h3 id="detail-quantity" className="text-base font-semibold text-text mb-3">
                  現在ある量
                </h3>
                <p className="text-2xl font-bold text-text">{currentQuantity}</p>
              </section>

              {/* 品質管理（入荷バッチ） */}
              <section aria-labelledby="detail-batches" className="space-y-3">
                <h3 id="detail-batches" className="text-base font-semibold text-text mb-3">
                  品質管理（入荷バッチ）
                </h3>
                {batches.length === 0 ? (
                  <p className="text-base text-text-muted py-4 rounded-xl border-2 border-border bg-base-subtle px-6">
                    入荷バッチがありません
                  </p>
                ) : (
                  <div className="rounded-xl border-2 border-border overflow-hidden">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="bg-base-subtle border-b-2 border-border">
                          <th scope="col" className="px-4 py-3 font-semibold text-text border-r border-border">
                            入荷日
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold text-text text-right border-r border-border">
                            数量
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold text-text border-r border-border">
                            品質管理日
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold text-text border-r border-border">
                            場所
                          </th>
                          <th scope="col" className="px-4 py-3 w-24" />
                        </tr>
                      </thead>
                      <tbody>
                        {batches.map((b) => (
                          <tr key={b.id} className="border-b border-border hover:bg-base-subtle">
                            <td className="px-4 py-3 text-text border-r border-border">{formatDate(b.received_at)}</td>
                            {editingBatchId === b.id ? (
                              <td colSpan={4} className="px-4 py-3 bg-base-subtle">
                                <form onSubmit={(e) => handleSaveBatch(e, b.id)} className="flex flex-wrap items-center gap-4 py-2">
                                  <div className="min-w-0">
                                    <label htmlFor={`batch-qty-${b.id}`} className="sr-only">数量</label>
                                    <input
                                      id={`batch-qty-${b.id}`}
                                      type="number"
                                      min={0}
                                      step={0.01}
                                      placeholder="数量"
                                      value={formBatch.quantity ?? b.quantity}
                                      onChange={(e) => setFormBatch((f) => ({ ...f, quantity: Number(e.target.value) }))}
                                      className={`${inputBase} w-24 min-h-[44px] py-2`}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <label htmlFor={`batch-disposal-${b.id}`} className="sr-only">品質管理日</label>
                                    <input
                                      id={`batch-disposal-${b.id}`}
                                      type="date"
                                      value={formBatch.disposal_date ?? (b.disposal_date || "").slice(0, 10) ?? ""}
                                      onChange={(e) => setFormBatch((f) => ({ ...f, disposal_date: e.target.value }))}
                                      className={`${inputBase} min-h-[44px] py-2`}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-[120px]">
                                    <label htmlFor={`batch-location-${b.id}`} className="sr-only">場所</label>
                                    <input
                                      id={`batch-location-${b.id}`}
                                      type="text"
                                      placeholder="場所"
                                      value={formBatch.location ?? b.location ?? ""}
                                      onChange={(e) => setFormBatch((f) => ({ ...f, location: e.target.value }))}
                                      className={`${inputBase} min-h-[44px] py-2`}
                                    />
                                  </div>
                                  <div className="flex gap-2 shrink-0">
                                    <button type="submit" className={btn.primary + " min-h-[44px] py-2 px-4"}>
                                      保存
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => { setEditingBatchId(null); setFormBatch({}); }}
                                      className={btn.secondary + " min-h-[44px] py-2 px-4"}
                                    >
                                      キャンセル
                                    </button>
                                  </div>
                                </form>
                              </td>
                            ) : (
                              <>
                                <td className="px-4 py-3 text-right text-text border-r border-border">{b.quantity}</td>
                                <td className="px-4 py-3 text-text border-r border-border">
                                  {b.disposal_date ? formatDate(b.disposal_date) : "—"}
                                </td>
                                <td className="px-4 py-3 text-text border-r border-border">{b.location ?? "—"}</td>
                                <td className="px-4 py-3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingBatchId(b.id);
                                      setFormBatch({
                                        quantity: b.quantity,
                                        disposal_date: (b.disposal_date || "").slice(0, 10),
                                        location: b.location ?? "",
                                      });
                                    }}
                                    className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1 min-h-[44px] inline-flex items-center"
                                  >
                                    編集
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* 売上 */}
              <section aria-labelledby="detail-sales" className="space-y-3">
                <h3 id="detail-sales" className="text-base font-semibold text-text mb-3">
                  売上（この商品を含む）
                </h3>
                {salesForProduct.length === 0 ? (
                  <p className="text-base text-text-muted py-4 rounded-xl border-2 border-border bg-base-subtle px-6">
                    該当する売上はありません
                  </p>
                ) : (
                  <ul className="space-y-3" role="list">
                    {salesForProduct.map((s) => {
                      const item = s.sale_items?.find((i: { product_id: string }) => i.product_id === productId);
                      if (!item) return null;
                      return (
                        <li
                          key={s.id}
                          className="rounded-xl border-2 border-border bg-base-subtle p-4 text-base text-text"
                        >
                          <p className="font-semibold text-text">
                            {formatDateTime(s.created_at)} — {formatYen(s.total_amount)}
                          </p>
                          <p className="text-sm text-text-muted mt-1">
                            数量: {item.quantity} / 単価: {formatYen(item.unit_price)} / 小計: {formatYen(item.subtotal)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>

              {/* 水やり */}
              <section aria-labelledby="detail-watering" className="space-y-3">
                <h3 id="detail-watering" className="text-base font-semibold text-text mb-3">
                  水やり
                </h3>
                {wateringForProduct.length === 0 ? (
                  <p className="text-base text-text-muted py-4 rounded-xl border-2 border-border bg-base-subtle px-6">
                    水やり記録がありません
                  </p>
                ) : (
                  <ul className="space-y-3" role="list">
                    {wateringForProduct.map((w) => (
                      <li
                        key={w.id}
                        className="rounded-xl border-2 border-border bg-base-subtle p-4 text-base text-text"
                      >
                        <p className="font-medium">実施: {formatDateTime(w.watered_at)}</p>
                        {w.next_watering_at && (
                          <p className="text-sm text-text-muted mt-1">次回予定: {formatDateTime(w.next_watering_at)}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
