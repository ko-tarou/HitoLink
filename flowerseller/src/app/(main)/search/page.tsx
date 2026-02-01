import { Suspense } from "react";
import { searchProductsByText } from "@/lib/actions/search";
import { SearchResults } from "./SearchResults";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductDetailDialog } from "@/components/inventory/ProductDetailDialog";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = q ? await searchProductsByText(q) : [];

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <PageHeader title="検索結果" />
      {!q ? (
        <p className="text-text-secondary text-base">検索キーワードを入力してください（例: 春っぽい赤い花）</p>
      ) : (
        <>
          <p className="text-text-secondary text-base mb-4">「{q}」の検索結果</p>
          <SearchResults results={results} searchQuery={q} />
        </>
      )}

      <Suspense fallback={null}>
        <ProductDetailDialog />
      </Suspense>
    </div>
  );
}
