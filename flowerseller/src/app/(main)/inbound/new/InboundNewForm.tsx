"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createInboundFromOcr } from "@/lib/actions/inbound";
import { Plus, Trash2 } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-white/80 mb-1">OCRテキスト（任意）</label>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder:text-white/50"
          rows={3}
          placeholder="仕入れ表をOCRしたテキストを貼り付け"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-white/80">明細</label>
          <button
            type="button"
            onClick={addRow}
            className="flex items-center gap-1 text-sm text-white/90 hover:text-white"
          >
            <Plus className="w-4 h-4" /> 行追加
          </button>
        </div>
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
          <div className="p-3 space-y-3">
            {items.map((row, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                <select
                  value={row.product_id}
                  onChange={(e) => updateRow(i, "product_id", e.target.value)}
                  className="flex-1 min-w-[140px] rounded-lg bg-white/10 border border-white/20 px-2 py-1.5 text-white text-sm"
                >
                  <option value="">商品を選択</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={row.quantity}
                  onChange={(e) => updateRow(i, "quantity", Number(e.target.value) || 0)}
                  className="w-20 rounded-lg bg-white/10 border border-white/20 px-2 py-1.5 text-white text-sm"
                />
                <input
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
                  className="w-24 rounded-lg bg-white/10 border border-white/20 px-2 py-1.5 text-white text-sm placeholder:text-white/50"
                />
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="p-1.5 text-white/70 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-white/25 px-4 py-2 text-white font-medium hover:bg-white/35 disabled:opacity-50"
        >
          {loading ? "登録中…" : "登録"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg bg-white/10 px-4 py-2 text-white font-medium hover:bg-white/20"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
