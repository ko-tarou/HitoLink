import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { getInventoryBatches } from "@/lib/actions/inventory";
import { formatYen, formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";

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
    <div className={pageContainer}>
      <PageHeader
        title="在庫管理"
        action={
          <Link
            href="/inventory/products/new"
            className={btn.primary}
            aria-label="商品を新規登録"
          >
            <Plus className="w-6 h-6" aria-hidden /> 商品登録
          </Link>
        }
      />

      <section className="mb-8" aria-labelledby="products-heading">
        <h3 id="products-heading" className="text-base font-semibold text-text mb-3">
          商品一覧
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-border">
              <thead>
                <tr className="border-b border-border bg-base-subtle">
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text">
                    名前
                  </th>
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text">
                    種別
                  </th>
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text">
                    カテゴリ
                  </th>
                  <th scope="col" className="px-4 py-3 text-right border-b border-border font-semibold text-text">
                    価格
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-border hover:bg-base-subtle"
                  >
                    <td className="px-4 py-3 font-medium border-r border-border text-text">{p.name}</td>
                    <td className="px-4 py-3 border-r border-border text-text">{typeLabel[p.type] ?? p.type}</td>
                    <td className="px-4 py-3 border-r border-border text-text">
                      {(p as { categories: { name: string } | null }).categories?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right border-border text-text">{formatYen(p.base_price)}</td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-text-muted text-center">
                      商品がありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="batches-heading">
        <h3 id="batches-heading" className="text-base font-semibold text-text mb-3">
          入荷バッチ（在庫単位）
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-border">
              <thead>
                <tr className="border-b border-border bg-base-subtle">
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text">
                    商品
                  </th>
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text text-right">
                    数量
                  </th>
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text">
                    入荷日
                  </th>
                  <th scope="col" className="px-4 py-3 border-b border-border font-semibold text-text">
                    廃棄予定
                  </th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-border hover:bg-base-subtle"
                  >
                    <td className="px-4 py-3 font-medium border-r border-border text-text">
                      {(b as { products: { name: string } | null }).products?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right border-r border-border text-text">{b.quantity}</td>
                    <td className="px-4 py-3 border-r border-border text-text">{formatDate(b.received_at)}</td>
                    <td className="px-4 py-3 border-border text-text">
                      {b.disposal_date ? formatDate(b.disposal_date) : "—"}
                    </td>
                  </tr>
                ))}
                {batches.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-text-muted text-center">
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
