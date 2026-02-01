import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "@/lib/actions/products";
import { getInventoryBatches } from "@/lib/actions/inventory";
import { getCategories } from "@/lib/actions/categories";
import { formatYen } from "@/lib/utils";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";
import { SearchBar } from "@/components/SearchBar";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import type { ProductType } from "@/types/database";

const typeLabel: Record<string, string> = {
  single: "単品",
  bundle: "束",
  arrangement: "アレンジ",
};

type SortBy = "name" | "updated_at" | "base_price";
type Order = "asc" | "desc";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category_id?: string; sort_by?: string; order?: string }>;
}) {
  const params = await searchParams;
  const categoryId = params.category_id ?? undefined;
  const sortBy = (params.sort_by as SortBy) ?? "name";
  const order = (params.order as Order) ?? "asc";

  const [products, batches, categories] = await Promise.all([
    getProducts({ sortBy, order, categoryId }),
    getInventoryBatches(),
    getCategories(),
  ]);

  const quantityByProductId = batches.reduce<Record<string, number>>((acc, b) => {
    acc[b.product_id] = (acc[b.product_id] ?? 0) + b.quantity;
    return acc;
  }, {});

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

      <SearchBar />

      <section className="mb-8" aria-labelledby="products-heading">
        <h3 id="products-heading" className="text-base font-semibold text-text mb-3">
          商品一覧
        </h3>
        <Suspense fallback={<div className="h-10 mb-4" aria-hidden />}>
          <InventoryFilters categories={categories} />
        </Suspense>
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
                  <th scope="col" className="px-4 py-3 border-r border-b border-border font-semibold text-text text-right">
                    現在ある量
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
                    <td className="px-4 py-3 border-r border-border text-text">{typeLabel[p.type as ProductType] ?? p.type}</td>
                    <td className="px-4 py-3 border-r border-border text-text">
                      {(p as { categories: { name: string } | null }).categories?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right border-r border-border text-text">
                      {quantityByProductId[p.id] ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right border-border text-text">{formatYen(p.base_price)}</td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-text-muted text-center">
                      商品がありません
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
