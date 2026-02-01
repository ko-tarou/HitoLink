"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mb-8"
      role="search"
      aria-label="商品検索"
    >
      <div className="flex flex-row flex-nowrap items-stretch gap-4 p-4 rounded-xl bg-base border-2 border-border">
        <label htmlFor="search-input" className="sr-only">
          花を検索（例: 春っぽい赤い花）
        </label>
        <div className="flex items-center gap-3 flex-1 min-w-0 rounded-lg border border-border bg-base focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 py-2">
          <Search className="w-6 h-6 text-text-muted shrink-0 ml-3" aria-hidden />
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="花を検索（例: 春っぽい赤い花）"
            className="flex-1 min-w-0 py-2 px-1 bg-transparent text-text placeholder:text-text-muted text-base border-0 focus:outline-none focus:ring-0"
            aria-label="検索キーワード"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3 text-base font-semibold hover:bg-primary-hover transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-w-[100px] min-h-[48px]"
          aria-label="検索を実行"
        >
          <Search className="w-5 h-5" aria-hidden />
          検索
        </button>
      </div>
    </form>
  );
}
