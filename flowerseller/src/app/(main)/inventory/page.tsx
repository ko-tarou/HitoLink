import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { getInventoryBatches } from "@/lib/actions/inventory";
import { formatYen, formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

const typeLabel: Record<string, string> = {
  single: "単品",
  bundle: "束",
  arrangement: "アレンジ",
};

export default async function InventoryPage() {
  const [products, batches] = await Promise.all([
    getProducts({ sortBy: "name", order: "asc" }),
    getInventoryBatches(),
  ]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">在庫管理</h2>
        <Link
          href="/inventory/products/new"
          className="flex items-center gap-2 rounded-2xl bg-white/20 px-5 py-3 text-base font-semibold text-white hover:bg-white/30 border-2 border-white/25"
        >
          <Plus className="w-6 h-6" /> 商品登録
        </Link>
      </div>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-white/90 mb-2">商品一覧</h3>
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-white/25">
              <thead>
                <tr className="border-b border-white/25 text-white/80 bg-white/5">
                  <th className="px-3 py-2 border-r border-b border-white/25">名前</th>
                  <th className="px-3 py-2 border-r border-b border-white/25">種別</th>
                  <th className="px-3 py-2 border-r border-b border-white/25">カテゴリ</th>
                  <th className="px-3 py-2 text-right border-b border-white/25">価格</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-white/25 hover:bg-white/5"
                  >
                    <td className="px-3 py-2 font-medium border-r border-white/25">{p.name}</td>
                    <td className="px-3 py-2 border-r border-white/25">{typeLabel[p.type] ?? p.type}</td>
                    <td className="px-3 py-2 border-r border-white/25">
                      {(p as { categories: { name: string } | null }).categories?.name ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right border-white/25">{formatYen(p.base_price)}</td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-white/60 text-center border-white/25">
                      商品がありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-white/90 mb-2">入荷バッチ（在庫単位）</h3>
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-white/25">
              <thead>
                <tr className="border-b border-white/25 text-white/80 bg-white/5">
                  <th className="px-3 py-2 border-r border-b border-white/25">商品</th>
                  <th className="px-3 py-2 border-r border-b border-white/25 text-right">数量</th>
                  <th className="px-3 py-2 border-r border-b border-white/25">入荷日</th>
                  <th className="px-3 py-2 border-b border-white/25">廃棄予定</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-white/25 hover:bg-white/5"
                  >
                    <td className="px-3 py-2 font-medium border-r border-white/25">
                      {(b as { products: { name: string } | null }).products?.name ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right border-r border-white/25">{b.quantity}</td>
                    <td className="px-3 py-2 border-r border-white/25">{formatDate(b.received_at)}</td>
                    <td className="px-3 py-2 border-white/25">
                      {b.disposal_date ? formatDate(b.disposal_date) : "-"}
                    </td>
                  </tr>
                ))}
                {batches.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-white/60 text-center border-white/25">
                      入荷バッチがありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
