import { getSales } from "@/lib/actions/sales";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { formatYen, formatDateTime } from "@/lib/utils";
import { pageContainer } from "@/lib/ui-classes";
import { SalesGraph } from "@/app/(main)/pos/SalesGraph";

const paymentLabel: Record<string, string> = {
  cash: "現金",
  credit: "クレジット",
  paypay: "PayPay",
};

type SaleItem = {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  products?: { name: string } | null;
};

type Sale = {
  id: string;
  total_amount: number;
  payment_method: string;
  created_at: string;
  sale_items?: SaleItem[];
};

function aggregateSalesByDay(sales: Sale[], days = 14): { date: string; amount: number }[] {
  const map = new Map<string, number>();
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, 0);
  }
  for (const s of sales) {
    const key = new Date(s.created_at).toISOString().slice(0, 10);
    if (map.has(key)) {
      map.set(key, (map.get(key) ?? 0) + s.total_amount);
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, amount]) => ({ date, amount }));
}

function isToday(isoDateStr: string): boolean {
  const d = new Date(isoDateStr);
  const today = new Date();
  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
}

/** 生産者: 売れ行き（販売者・仲介者の売上とはロジック分離） */
export default async function ProducerSellThroughPage() {
  const [sales, products, categories] = await Promise.all([
    getSales(),
    getProducts({ sortBy: "name", order: "asc" }),
    getCategories(),
  ]);
  const salesList = sales as Sale[];
  const graphData = aggregateSalesByDay(salesList);
  const todaySales = salesList.filter((s) => isToday(s.created_at));

  return (
    <div className={pageContainer}>
      <section className="mb-8" aria-labelledby="sell-through-graph-heading">
        <SalesGraph
          data={graphData}
          sales={salesList}
          products={products.map((p) => ({ id: p.id, name: p.name, category_id: p.category_id ?? null }))}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      </section>

      <section aria-labelledby="sell-through-today-heading">
        <h3 id="sell-through-today-heading" className="text-base font-semibold text-text mb-3">
          本日の売れ行き
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {todaySales.map((s) => (
              <li key={s.id} className="px-6 py-4 text-text">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <span className="font-medium text-base block">
                      {formatDateTime(s.created_at)}
                    </span>
                    <span
                      className="inline-block mt-1 px-2.5 py-1 rounded-md text-sm font-medium bg-base-subtle text-text border border-border"
                      aria-label={`決済方法: ${paymentLabel[s.payment_method] ?? s.payment_method}`}
                    >
                      {paymentLabel[s.payment_method] ?? s.payment_method}
                    </span>
                  </div>
                  <span className="font-bold text-lg text-text shrink-0">
                    {formatYen(s.total_amount)}
                  </span>
                </div>
                {s.sale_items && s.sale_items.length > 0 && (
                  <ul className="mt-3 pl-0 list-none text-sm text-text-muted space-y-1" role="list">
                    {s.sale_items.map((i) => (
                      <li key={i.id}>
                        {i.products?.name ?? "商品"} × {i.quantity} — {formatYen(i.subtotal)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {todaySales.length === 0 && (
              <li className="px-6 py-8 text-text-muted text-center text-base" role="status">
                本日の売れ行きはありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
