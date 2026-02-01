"use client";

import Link from "next/link";
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

export function SearchResults({ results }: { results: Result[] }) {
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
        {results.map((r) => (
          <li key={r.id}>
            <Link
              href={`/inventory?product=${r.id}`}
              className="block px-6 py-4 flex justify-between items-center text-text hover:bg-base-subtle transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
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
        ))}
      </ul>
    </div>
  );
}
