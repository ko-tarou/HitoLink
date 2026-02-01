"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct } from "@/lib/actions/products";
import type { ProductType } from "@/types/database";

type CategoryOption = { id: string; name: string };

const types: { value: ProductType; label: string }[] = [
  { value: "single", label: "単品" },
  { value: "bundle", label: "束" },
  { value: "arrangement", label: "アレンジメント" },
];

export function ProductNewForm({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<ProductType>("single");
  const [categoryId, setCategoryId] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [disposalDays, setDisposalDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(basePrice);
    if (!name.trim()) {
      setError("商品名を入力してください");
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setError("価格を正しく入力してください");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createProduct({
        name: name.trim(),
        type,
        category_id: categoryId || null,
        base_price: price,
        description: description.trim() || null,
        disposal_days: disposalDays ? Number(disposalDays) : null,
      });
      router.push("/inventory");
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
        <label className="block text-sm text-white/80 mb-1">商品名 *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder:text-white/50"
          placeholder="例: バラ 10本束"
        />
      </div>
      <div>
        <label className="block text-sm text-white/80 mb-1">種別</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ProductType)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
        >
          {types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-white/80 mb-1">カテゴリ</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
        >
          <option value="">未選択</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-white/80 mb-1">販売価格（円） *</label>
        <input
          type="number"
          min={0}
          step={1}
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder:text-white/50"
          placeholder="0"
        />
      </div>
      <div>
        <label className="block text-sm text-white/80 mb-1">説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder:text-white/50"
          rows={2}
          placeholder="任意"
        />
      </div>
      <div>
        <label className="block text-sm text-white/80 mb-1">廃棄予定までの日数（鮮度）</label>
        <input
          type="number"
          min={1}
          value={disposalDays}
          onChange={(e) => setDisposalDays(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder:text-white/50"
          placeholder="未設定"
        />
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
