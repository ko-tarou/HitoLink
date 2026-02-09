import { getCategories } from "@/lib/actions/categories";
import { getProducts } from "@/lib/actions/products";
import { ProductNewForm } from "@/app/(main)/inventory/products/new/ProductNewForm";

/** 数値配列の最頻値を返す。空なら undefined */
function mode(values: number[]): number | undefined {
  if (values.length === 0) return undefined;
  const counts = new Map<number, number>();
  for (const v of values) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  let maxCount = 0;
  let modeVal: number | undefined;
  for (const [val, count] of counts) {
    if (count > maxCount) {
      maxCount = count;
      modeVal = val;
    }
  }
  return modeVal;
}

/** 生産者: 品目登録（栽培管理用） */
export default async function ProducerCultivationProductNewPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const defaultCategoryId = categories.find((c) => c.name === "切り花")?.id ?? "";
  const prices = products.map((p) => Number(p.base_price)).filter((n) => !Number.isNaN(n));
  const defaultBasePrice = mode(prices);
  const disposalDaysValues = products
    .map((p) => p.disposal_days)
    .filter((d): d is number => d != null && !Number.isNaN(d));
  const defaultDisposalDays = mode(disposalDaysValues) ?? 3;

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <ProductNewForm
        categories={categories}
        defaultCategoryId={defaultCategoryId}
        defaultBasePrice={defaultBasePrice}
        defaultDisposalDays={defaultDisposalDays}
        successRedirect="/producer/cultivation"
      />
    </div>
  );
}
