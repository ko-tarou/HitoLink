import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "@/lib/actions/products";
import { getInventoryBatches } from "@/lib/actions/inventory";
import { getCategories } from "@/lib/actions/categories";
import { Plus } from "lucide-react";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";
import { SearchBar } from "@/components/SearchBar";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { InventoryTableBody } from "@/components/inventory/InventoryTableBody";
import { ProductDetailDialog } from "@/components/inventory/ProductDetailDialog";

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
      <div className="flex justify-end mb-4">
        <Link
          href="/inventory/products/new"
          className={btn.primary}
          aria-label="商品を新規登録"
        >
          <Plus className="w-6 h-6" aria-hidden /> 商品登録
        </Link>
      </div>

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
                  <th scope="col" className="px-4 py-3 w-14 border-b border-border" aria-label="削除">
                  </th>
                </tr>
              </thead>
              <Suspense fallback={null}>
                <InventoryTableBody
                  products={products}
                  quantityByProductId={quantityByProductId}
                />
              </Suspense>
            </table>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProductDetailDialog />
      </Suspense>
    </div>
  );
}
