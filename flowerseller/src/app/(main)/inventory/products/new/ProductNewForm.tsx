"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createProduct } from "@/lib/actions/products";
import { getSimilarProducts } from "@/lib/actions/products";
import type { ProductType } from "@/types/database";
import { FormActions } from "@/components/ui/FormActions";
import { btn } from "@/lib/ui-classes";

type CategoryOption = { id: string; name: string };

const types: { value: ProductType; label: string }[] = [
  { value: "single", label: "単品" },
  { value: "bundle", label: "束" },
  { value: "arrangement", label: "アレンジメント" },
];

const DEBOUNCE_MS = 400;
const MIN_NAME_LENGTH_FOR_SEARCH = 2;

type ProductNewFormProps = {
  categories: CategoryOption[];
  defaultCategoryId?: string;
  defaultBasePrice?: number;
  defaultDisposalDays?: number;
  /** 登録成功後のリダイレクト先。未指定時は /inventory */
  successRedirect?: string;
};

export function ProductNewForm({
  categories,
  defaultCategoryId = "",
  defaultBasePrice,
  defaultDisposalDays = 3,
  successRedirect = "/inventory",
}: ProductNewFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<ProductType>("single");
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [basePrice, setBasePrice] = useState(defaultBasePrice !== undefined ? String(defaultBasePrice) : "");
  const [description, setDescription] = useState("");
  const [disposalDays, setDisposalDays] = useState(
    defaultDisposalDays !== undefined ? String(defaultDisposalDays) : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [similarProducts, setSimilarProducts] = useState<
    { id: string; name: string; type: string; base_price: number; similarity?: number }[]
  >([]);
  const [checkingSimilar, setCheckingSimilar] = useState(false);
  const [similarError, setSimilarError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const q = name.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSimilarError(null);
    if (q.length < MIN_NAME_LENGTH_FOR_SEARCH) {
      setSimilarProducts([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setCheckingSimilar(true);
      setSimilarError(null);
      try {
        const list = await getSimilarProducts(q, 5);
        setSimilarProducts(list ?? []);
      } catch (e) {
        setSimilarProducts([]);
        setSimilarError(e instanceof Error ? e.message : "類似商品の取得に失敗しました");
      } finally {
        setCheckingSimilar(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [name]);

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
      router.replace(successRedirect);
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
          aria-describedby={similarProducts.length > 0 ? "similar-products-notice" : undefined}
        />
        {checkingSimilar && (
          <p className="mt-1 text-sm text-text-muted" role="status">
            似た商品を検索しています…
          </p>
        )}
        {similarError && (
          <p className="mt-1 text-sm text-error" role="alert">
            {similarError}
          </p>
        )}
      </div>

      {similarProducts.length > 0 && (
        <div
          id="similar-products-notice"
          className="rounded-xl border-2 border-primary bg-primary-light px-4 py-3 text-text"
          role="alert"
        >
          <p className="font-medium text-text">
            同様の名前の商品がすでにあります。
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {similarProducts.slice(0, 5).map((p) => p.name).join("、")}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
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
      </div>
      <div className="grid grid-cols-2 gap-4">
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
