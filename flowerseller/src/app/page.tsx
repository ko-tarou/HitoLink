import { HomeGrid } from "@/components/HomeGrid";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-maroon flex flex-col">
      {/* 左上: サービス名 */}
      <header className="flex justify-between items-center px-4 py-3 text-white border-b border-white/20">
        <span className="text-lg font-bold">Flower Seller</span>
      </header>

      <main className="flex-1 flex flex-col items-center pt-4 pb-8">
        <SearchBar />
        <HomeGrid />
      </main>
    </div>
  );
}
