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
      <div className="rounded-xl bg-maroon-light/80 border border-white/15 px-4 py-6 text-center text-white/60">
        該当する商品がありません
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
      <ul className="divide-y divide-white/10">
        {results.map((r) => (
          <li key={r.id}>
            <Link
              href={`/inventory?product=${r.id}`}
              className="block px-4 py-3 flex justify-between items-center hover:bg-white/5"
            >
              <div>
                <span className="text-white font-medium">{r.name}</span>
                <span className="ml-2 text-white/60 text-sm">
                  {typeLabel[r.type] ?? r.type}
                </span>
              </div>
              <span className="text-white font-medium">{formatYen(Number(r.base_price))}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
