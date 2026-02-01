"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { formatYen } from "@/lib/utils";

type Result = {
  id: string;
  name: string;
  type: string;
  base_price: number;
  similarity?: number;
};

const typeLabel: Record<string, string> = {
  single: "単品",
  bundle: "束",
  arrangement: "アレンジ",
};

const linkClass =
  "flex w-full px-6 py-4 justify-between items-center text-text hover:bg-base-subtle transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary";

export function SearchResults({ results, searchQuery }: { results: Result[]; searchQuery?: string }) {
  const router = useRouter();

  const openDialogReplace = useCallback(
    (e: React.MouseEvent, productId: string) => {
      if (searchQuery == null) return;
      e.preventDefault();
      router.replace(`/search?${new URLSearchParams({ q: searchQuery, product_id: productId })}`);
    },
    [router, searchQuery]
  );

  if (results.length === 0) {
    return (
      <div
        className="rounded-xl bg-base border border-border px-6 py-8 text-center text-text-muted"
        role="status"
      >
        該当する商品がありません
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-base border border-border overflow-hidden">
      <ul className="divide-y divide-border" role="list">
        {results.map((r) =>
          searchQuery != null ? (
            <li key={r.id}>
              <button
                type="button"
                onClick={(e) => openDialogReplace(e, r.id)}
                className={linkClass + " w-full text-left"}
              >
                <div>
                  <span className="font-medium text-text">{r.name}</span>
                  <span className="ml-2 text-text-muted text-sm">
                    {typeLabel[r.type] ?? r.type}
                  </span>
                </div>
                <span className="font-medium text-text">{formatYen(Number(r.base_price))}</span>
              </button>
            </li>
          ) : (
            <li key={r.id}>
              <Link
                href={`/inventory?product_id=${r.id}`}
                className={linkClass}
              >
                <div>
                  <span className="font-medium text-text">{r.name}</span>
                  <span className="ml-2 text-text-muted text-sm">
                    {typeLabel[r.type] ?? r.type}
                  </span>
                </div>
                <span className="font-medium text-text">{formatYen(Number(r.base_price))}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
