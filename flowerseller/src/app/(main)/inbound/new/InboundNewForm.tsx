"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createInboundFromOcr } from "@/lib/actions/inbound";
import { Plus, Trash2 } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { btn } from "@/lib/ui-classes";

type ProductRow = { product_id: string; quantity: number; unit_price: number | null };

export function InboundNewForm({
  products,
}: {
  products: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<ProductRow[]>([
    { product_id: "", quantity: 1, unit_price: null },
  ]);
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addRow = () => {
    setItems((prev) => [...prev, { product_id: "", quantity: 1, unit_price: null }]);
  };

  const removeRow = (i: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateRow = (i: number, field: keyof ProductRow, value: string | number) => {
    setItems((prev) => {
      const next = [...prev];
      (next[i] as Record<string, unknown>)[field] = value;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const valid = items.filter((r) => r.product_id && r.quantity > 0);
    if (valid.length === 0) {
      setError("商品を1件以上選択し、数量を入力してください");
      return;
    }
    setLoading(true);
    try {
      await createInboundFromOcr({
        raw_text: rawText || null,
        items: valid.map((r) => ({
          product_id: r.product_id,
          quantity: r.quantity,
          unit_price: r.unit_price ?? undefined,
        })),
      });
      router.push("/inbound");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-text" noValidate aria-label="入荷登録フォーム">
      <div>
        <label htmlFor="inbound-raw-text" className="block text-sm font-medium text-text mb-2">
          OCRテキスト（任意）
        </label>
        <textarea
          id="inbound-raw-text"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          rows={3}
          placeholder="仕入れ表をOCRしたテキストを貼り付け"
          aria-label="OCRテキスト（任意）"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-text">明細</span>
          <button
            type="button"
            onClick={addRow}
            className="flex items-center gap-2 rounded-lg border-2 border-border bg-base-subtle px-3 py-2 text-sm text-text hover:bg-base-muted transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="明細行を追加"
          >
            <Plus className="w-4 h-4" aria-hidden /> 行追加
          </button>
        </div>
        <div className="rounded-xl bg-base border border-border overflow-hidden p-4 space-y-4">
          {items.map((row, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <label htmlFor={`inbound-product-${i}`} className="sr-only">
                {i + 1}行目: 商品
              </label>
              <select
                id={`inbound-product-${i}`}
                value={row.product_id}
                onChange={(e) => updateRow(i, "product_id", e.target.value)}
                className="flex-1 min-w-[140px] rounded-lg border border-border bg-base px-3 py-2 text-text text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                aria-label={`${i + 1}行目: 商品を選択`}
              >
                <option value="">商品を選択</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <label htmlFor={`inbound-qty-${i}`} className="sr-only">
                {i + 1}行目: 数量
              </label>
              <input
                id={`inbound-qty-${i}`}
                type="number"
                min={0.01}
                step={0.01}
                value={row.quantity}
                onChange={(e) => updateRow(i, "quantity", Number(e.target.value) || 0)}
                className="w-20 rounded-lg border border-border bg-base px-3 py-2 text-text text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                aria-label={`${i + 1}行目: 数量`}
              />
              <label htmlFor={`inbound-price-${i}`} className="sr-only">
                {i + 1}行目: 単価
              </label>
              <input
                id={`inbound-price-${i}`}
                type="number"
                min={0}
                step={1}
                placeholder="単価"
                value={row.unit_price ?? ""}
                onChange={(e) =>
                  updateRow(
                    i,
                    "unit_price",
                    e.target.value === "" ? (null as unknown as number) : Number(e.target.value)
                  )
                }
                className="w-24 rounded-lg border border-border bg-base px-3 py-2 text-text text-sm placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                aria-label={`${i + 1}行目: 単価`}
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="p-2 text-text-muted hover:text-error transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                aria-label={`${i + 1}行目を削除`}
              >
                <Trash2 className="w-4 h-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>
      </div>
      {error && (
        <p className="text-sm text-error font-medium" role="alert">
          {error}
        </p>
      )}
      <FormActions
        secondary={
          <button
            type="button"
            onClick={() => router.back()}
            className={btn.secondary}
            aria-label="キャンセルして戻る"
          >
            キャンセル
          </button>
        }
        primary={
          <button
            type="submit"
            disabled={loading}
            className={btn.primary}
            aria-busy={loading}
            aria-label={loading ? "登録中" : "入荷を登録"}
          >
            {loading ? "登録中…" : "登録"}
          </button>
        }
      />
    </form>
  );
}
