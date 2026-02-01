"use client";

import { useState } from "react";
import { applyBulkPriceAdjustment } from "@/lib/actions/price";
import { useRouter } from "next/navigation";
import { FormActions } from "@/components/ui/FormActions";
import { btn } from "@/lib/ui-classes";

type Category = { id: string; name: string };

export function PriceAdjustForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(value);
    if (Number.isNaN(num) || num === 0) {
      setError("有効なパーセントを入力してください（例: 10 で+10%、-5 で-5%）");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await applyBulkPriceAdjustment({
        value: num,
        category_id: categoryId || null,
      });
      router.refresh();
      setValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "適用に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-text" noValidate aria-label="価格一括調整フォーム">
      <div>
        <label htmlFor="price-adjust-value" className="block text-sm font-medium text-text mb-2">
          調整率（%）
        </label>
        <input
          id="price-adjust-value"
          type="number"
          step={0.1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="例: 10 で+10%、-5 で-5%"
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          aria-label="調整率（パーセント）"
        />
      </div>
      <div>
        <label htmlFor="price-adjust-category" className="block text-sm font-medium text-text mb-2">
          対象カテゴリ
        </label>
        <select
          id="price-adjust-category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          aria-label="対象カテゴリを選択"
        >
          <option value="">全商品</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-error font-medium" role="alert">
          {error}
        </p>
      )}
      <FormActions
        primary={
          <button
            type="submit"
            disabled={loading}
            className={btn.primary}
            aria-busy={loading}
            aria-label={loading ? "適用中" : "一括価格を適用"}
          >
            {loading ? "適用中…" : "一括価格を適用"}
          </button>
        }
      />
    </form>
  );
}
