"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { applyPriceAdjustment } from "@/lib/actions/price";
import { btn, inputBase, selectBase } from "@/lib/ui-classes";

type Product = { id: string; name: string; base_price: number; category_id: string | null };
type Category = { id: string; name: string };

type ScopeKind = "product" | "category" | "all";
const scopeLabels: { value: ScopeKind; label: string }[] = [
  { value: "product", label: "商品名" },
  { value: "category", label: "カテゴリ" },
  { value: "all", label: "全ての商品" },
];

const unitOptions: { value: "percent" | "yen"; label: string }[] = [
  { value: "percent", label: "%" },
  { value: "yen", label: "円" },
];

const operationOptions: { value: "increase" | "decrease"; label: string }[] = [
  { value: "increase", label: "値上げ ( + )" },
  { value: "decrease", label: "値下げ ( - )" },
];

type Props = {
  products: Product[];
  categories: Category[];
};

export function PriceFormulaForm({ products, categories }: Props) {
  const router = useRouter();
  const [scope, setScope] = useState<ScopeKind>("all");
  const [productId, setProductId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<"percent" | "yen">("percent");
  const [operation, setOperation] = useState<"increase" | "decrease">("increase");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(value);
    if (value === "" || Number.isNaN(num)) {
      setError("数値を入力してください");
      return;
    }
    if (scope === "product" && !productId) {
      setError("商品を選択してください");
      return;
    }
    if (scope === "category" && !categoryId) {
      setError("カテゴリを選択してください");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await       await applyPriceAdjustment({
        scope,
        product_id: scope === "product" ? productId : null,
        category_id: scope === "category" ? categoryId : null,
        value: num,
        unit,
        operation: operation as "increase" | "decrease",
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
    <form onSubmit={handleSubmit} className="text-text" noValidate aria-label="価格調整の式">
      <div className="flex flex-wrap items-center gap-3 gap-y-4 justify-between">
        <div className="min-w-[140px]">
          <select
            id="price-scope"
            value={scope}
            onChange={(e) => setScope(e.target.value as ScopeKind)}
            className={selectBase}
            aria-label="対象"
          >
            {scopeLabels.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        {scope === "product" && (
          <div className="min-w-[160px]">
            <select
              id="price-product"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className={selectBase}
              aria-label="商品を選択"
            >
              <option value="">選択してください</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {scope === "category" && (
          <div className="min-w-[140px]">
            <select
              id="price-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={selectBase}
              aria-label="カテゴリを選択"
            >
              <option value="">選択してください</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <span className="text-base text-text" aria-hidden>を</span>
        <div className="w-24">
          <input
            id="price-value"
            type="number"
            step={unit === "percent" ? 0.1 : 1}
            min={unit === "percent" ? undefined : 0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
            className={inputBase}
            aria-label="数値"
          />
        </div>
        <div className="min-w-[80px]">
          <select
            id="price-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as "percent" | "yen")}
            className={selectBase}
            aria-label="単位"
          >
            {unitOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[140px]">
          <select
            id="price-operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as typeof operation)}
            className={selectBase}
            aria-label="操作"
          >
            {operationOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${btn.primary} ml-auto`}
          aria-busy={loading}
          aria-label={loading ? "実行中" : "実行"}
        >
          {loading ? "実行中…" : "実行"}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-error font-medium" role="alert">
          {error}
        </p>
      )}

      <PriceExamplePreview
        products={products}
        scope={scope}
        productId={productId}
        categoryId={categoryId}
        valueStr={value}
        unit={unit}
        operation={operation}
      />
    </form>
  );
}

function computeNewPrice(
  basePrice: number,
  value: number,
  unit: "percent" | "yen",
  operation: "increase" | "decrease"
): number {
  let newPrice: number;
  if (unit === "yen") {
    newPrice = operation === "increase" ? basePrice + value : basePrice - value;
  } else {
    const factor = operation === "increase" ? 1 + value / 100 : 1 - value / 100;
    newPrice = basePrice * factor;
  }
  return Math.max(0, Math.round(newPrice));
}

function formatExampleOp(
  value: number,
  unit: "percent" | "yen",
  operation: "increase" | "decrease"
): string {
  if (unit === "yen") {
    return operation === "increase" ? `+ ${value}` : `- ${value}`;
  }
  const factor = operation === "increase" ? 1 + value / 100 : 1 - value / 100;
  return `× ${factor}`;
}

function PriceExamplePreview({
  products,
  scope,
  productId,
  categoryId,
  valueStr,
  unit,
  operation,
}: {
  products: Product[];
  scope: ScopeKind;
  productId: string;
  categoryId: string;
  valueStr: string;
  unit: "percent" | "yen";
  operation: "increase" | "decrease";
}) {
  const num = valueStr === "" || Number.isNaN(Number(valueStr)) ? 0 : Number(valueStr);

  let example: Product | null = null;
  if (scope === "product" && productId) {
    example = products.find((x) => x.id === productId) ?? null;
  } else if (scope === "category" && categoryId) {
    example = products.find((p) => p.category_id === categoryId) ?? null;
  } else {
    example = products[0] ?? null;
  }
  if (!example) return null;

  const opStr = formatExampleOp(num, unit, operation);
  const p = example;
  const newPrice = computeNewPrice(p.base_price, num, unit, operation);
  const base = Math.round(p.base_price);
  return (
    <div className="mt-6 pt-4 border-t border-border">
      <p className="text-sm text-text">
        {p.name} {base} 円 {opStr} = {newPrice} 円
      </p>
    </div>
  );
}
