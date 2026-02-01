"use client";

import { useState } from "react";
import { applyBulkPriceAdjustment } from "@/lib/actions/price";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-white/80 mb-1">調整率（%）</label>
        <input
          type="number"
          step={0.1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="例: 10 で+10%、-5 で-5%"
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <label className="block text-sm text-white/80 mb-1">対象カテゴリ</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
        >
          <option value="">全商品</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-white/25 px-6 py-4 text-lg font-semibold text-white hover:bg-white/35 disabled:opacity-50 border-2 border-white/25"
      >
        {loading ? "適用中…" : "一括価格を適用"}
      </button>
    </form>
  );
}
