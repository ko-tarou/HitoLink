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
      className="w-full max-w-lg mx-auto px-4 mb-4"
    >
      <div className="flex items-center rounded-2xl bg-white/15 border-2 border-white/25 px-4 py-4 gap-3">
        <Search className="w-6 h-6 text-white/90 shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="花を検索（例: 春っぽい赤い花）"
          className="flex-1 bg-transparent text-white placeholder:text-white/70 outline-none text-lg"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-white/25 text-white font-semibold hover:bg-white/35 transition flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          検索
        </button>
      </div>
    </form>
  );
}
