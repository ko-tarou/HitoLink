import { Suspense } from "react";
import { SearchPageClient } from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto px-6 py-6 max-w-2xl text-text-muted">読み込み中…</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
