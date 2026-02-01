"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct } from "@/lib/actions/products";
import type { ProductType } from "@/types/database";
import { FormActions } from "@/components/ui/FormActions";
import { btn } from "@/lib/ui-classes";

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
      router.replace("/inventory");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-text" noValidate aria-label="商品登録フォーム">
      <div>
        <label htmlFor="product-name" className="block text-sm font-medium text-text mb-2">
          商品名 <span className="text-error" aria-hidden>*</span>
        </label>
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          placeholder="例: バラ 10本束"
          required
          aria-required="true"
          aria-invalid={error ? "true" : undefined}
        />
      </div>
      <div>
        <label htmlFor="product-type" className="block text-sm font-medium text-text mb-2">
          種別
        </label>
        <select
          id="product-type"
          value={type}
          onChange={(e) => setType(e.target.value as ProductType)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          aria-label="商品の種別"
        >
          {types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="product-category" className="block text-sm font-medium text-text mb-2">
          カテゴリ
        </label>
        <select
          id="product-category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          aria-label="カテゴリを選択"
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
        <label htmlFor="product-price" className="block text-sm font-medium text-text mb-2">
          販売価格（円） <span className="text-error" aria-hidden>*</span>
        </label>
        <input
          id="product-price"
          type="number"
          min={0}
          step={1}
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          placeholder="0"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="product-description" className="block text-sm font-medium text-text mb-2">
          説明
        </label>
        <textarea
          id="product-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          rows={3}
          placeholder="任意"
          aria-label="商品の説明"
        />
      </div>
      <div>
        <label htmlFor="product-disposal-days" className="block text-sm font-medium text-text mb-2">
          品質管理の目安（日数・鮮度）
        </label>
        <input
          id="product-disposal-days"
          type="number"
          min={1}
          value={disposalDays}
          onChange={(e) => setDisposalDays(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          placeholder="未設定"
          aria-label="品質管理の目安（日数）"
        />
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
            aria-label={loading ? "登録中" : "登録"}
          >
            {loading ? "登録中…" : "登録"}
          </button>
        }
      />
    </form>
  );
}
