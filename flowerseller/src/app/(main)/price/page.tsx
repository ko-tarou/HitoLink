import { getCategories } from "@/lib/actions/categories";
import { getProducts } from "@/lib/actions/products";
import { getPriceAdjustmentHistory } from "@/lib/actions/price";
import { formatDateTime, formatYen } from "@/lib/utils";
import { PriceFormulaForm } from "./PriceFormulaForm";

type HistoryItem = {
  id: string;
  adjustment_type: string;
  value: number;
  category_id: string | null;
  product_id?: string | null;
  created_at: string;
  categories: { name: string } | null;
  products?: { name: string } | null;
};

function formatAdjustmentLabel(adjType: string, value: number): string {
  if (adjType === "percentage") return `${value > 0 ? "+" : ""}${value}%`;
  const [unit, op] = adjType.split("_");
  const unitStr = unit === "percent" ? "%" : "円";
  const opStr = op === "increase" ? "値上げ" : op === "decrease" ? "値下げ" : op === "multiply" ? "割り増し" : "割引";
  return `${value}${unitStr} ${opStr}`;
}

export default async function PricePage() {
  const [categories, products, history] = await Promise.all([
    getCategories(),
    getProducts({ sortBy: "name", order: "asc" }),
    getPriceAdjustmentHistory(),
  ]);
  const historyList = (history ?? []) as HistoryItem[];

  const productRows = products.map((p) => ({
    id: p.id,
    name: p.name,
    base_price: p.base_price,
  }));

  return (
    <div className="mx-auto px-6 py-6 max-w-4xl">
      <section className="mb-8" aria-labelledby="price-formula-heading">
        <h3 id="price-formula-heading" className="text-base font-semibold text-text mb-3">
          価格調整
        </h3>
        <PriceFormulaForm
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            base_price: p.base_price,
            category_id: p.category_id ?? null,
          }))}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      </section>

      <section className="mb-8" aria-labelledby="price-list-heading">
        <h3 id="price-list-heading" className="text-base font-semibold text-text mb-3">
          商品と価格
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-border">
              <thead>
                <tr className="border-b border-border bg-base-subtle">
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text">
                    名前
                  </th>
                  <th scope="col" className="px-4 py-3 text-right border-b border-border font-semibold text-text">
                    価格
                  </th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((p) => (
                  <tr key={p.id} className="border-b border-border">
                    <td className="px-4 py-3 font-medium border-r border-border text-text">{p.name}</td>
                    <td className="px-4 py-3 text-right text-text">{formatYen(p.base_price)}</td>
                  </tr>
                ))}
                {productRows.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-text-muted text-center">
                      商品がありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="price-history-heading">
        <h3 id="price-history-heading" className="text-base font-semibold text-text mb-3">
          調整履歴
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {historyList.map((h) => (
              <li key={h.id} className="px-6 py-4 flex justify-between items-center text-text">
                <div>
                  <span className="font-medium">
                    {formatAdjustmentLabel(h.adjustment_type ?? "percentage", h.value)}
                  </span>
                  <span className="ml-2 text-text-muted text-sm">
                    {h.products?.name ?? h.categories?.name ?? "全商品"}
                  </span>
                </div>
                <span className="text-text-muted text-sm">
                  {formatDateTime(h.created_at)}
                </span>
              </li>
            ))}
            {historyList.length === 0 && (
              <li className="px-6 py-8 text-text-muted text-center" role="status">
                調整履歴がありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
