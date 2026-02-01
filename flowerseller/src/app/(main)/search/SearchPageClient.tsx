"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet, getAuthToken } from "@/lib/api";
import { SearchResults } from "./SearchResults";
import { ProductDetailDialog } from "@/components/inventory/ProductDetailDialog";

type SearchResult = {
  id: string;
  name: string;
  type: string;
  base_price: number;
  similarity?: number;
};

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    const token = getAuthToken();
    apiGet<SearchResult[]>(
      `/api/search/products?q=${encodeURIComponent(q.trim())}&limit=20`,
      token
    )
      .then((list) => setResults(list ?? []))
      .catch((e) => {
        setResults([]);
        setError(e instanceof Error ? e.message : "検索に失敗しました");
      })
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      {!q ? (
        <p className="text-text-secondary text-base">検索キーワードを入力してください（例: 春っぽい赤い花）</p>
      ) : (
        <>
          <p className="text-text-secondary text-base mb-4">「{q}」の検索結果</p>
          {loading && (
            <p className="text-text-muted text-sm mb-4" role="status">
              検索しています…
            </p>
          )}
          {error && (
            <p className="text-error text-sm mb-4" role="alert">
              {error}
            </p>
          )}
          {!loading && !error && <SearchResults results={results} searchQuery={q} />}
        </>
      )}

      <ProductDetailDialog />
    </div>
  );
}
