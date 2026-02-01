import { getCategories } from "@/lib/actions/categories";
import { getPriceAdjustmentHistory } from "@/lib/actions/price";
import { formatDateTime } from "@/lib/utils";
import { PriceAdjustForm } from "./PriceAdjustForm";

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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-white mb-4">価格管理（一括調整）</h2>

      <PriceAdjustForm categories={categories} />

      <section className="mt-6">
        <h3 className="text-sm font-semibold text-white/90 mb-2">調整履歴</h3>
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {historyList.map((h) => (
              <li key={h.id} className="px-4 py-3 flex justify-between items-center">
                <div>
                  <span className="text-white font-medium">
                    {h.value > 0 ? `+${h.value}%` : `${h.value}%`}
                  </span>
                  <span className="ml-2 text-white/60 text-sm">
                    {h.categories?.name ?? "全商品"}
                  </span>
                </div>
                <span className="text-white/80 text-sm">
                  {formatDateTime(h.created_at)}
                </span>
              </li>
            ))}
            {historyList.length === 0 && (
              <li className="px-4 py-6 text-white/60 text-center">
                調整履歴がありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
