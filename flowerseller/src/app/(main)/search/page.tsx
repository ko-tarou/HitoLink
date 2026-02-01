import { searchProductsByText } from "@/lib/actions/search";
import { SearchResults } from "./SearchResults";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = q ? await searchProductsByText(q) : [];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/15 border-2 border-white/25 text-white font-semibold text-lg hover:bg-white/25 transition w-full max-w-xs"
          aria-label="ホームへ戻る"
        >
          <ArrowLeft className="w-8 h-8" />
          戻る
        </Link>
      </div>
      <h2 className="text-xl font-bold text-white mb-4">検索結果</h2>
      {!q ? (
        <p className="text-white/80 text-base">検索キーワードを入力してください（例: 春っぽい赤い花）</p>
      ) : (
        <>
          <p className="text-white/90 text-base mb-4">「{q}」の検索結果</p>
          <SearchResults results={results} />
        </>
      )}
    </div>
  );
}
