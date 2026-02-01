import { getCategories } from "@/lib/actions/categories";
import { getPriceAdjustmentHistory } from "@/lib/actions/price";
import { formatDateTime } from "@/lib/utils";
import { PriceAdjustForm } from "./PriceAdjustForm";
import { PageHeader } from "@/components/ui/PageHeader";

type HistoryItem = {
  id: string;
  value: number;
  category_id: string | null;
  created_at: string;
  categories: { name: string } | null;
};

export default async function PricePage() {
  const [categories, history] = await Promise.all([
    getCategories(),
    getPriceAdjustmentHistory(),
  ]);
  const historyList = history as HistoryItem[];

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <PageHeader title="価格管理（一括調整）" />

      <PriceAdjustForm categories={categories} />

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
                    {h.value > 0 ? `+${h.value}%` : `${h.value}%`}
                  </span>
                  <span className="ml-2 text-text-muted text-sm">
                    {h.categories?.name ?? "全商品"}
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
