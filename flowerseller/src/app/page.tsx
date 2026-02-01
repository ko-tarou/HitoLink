import { HomeGrid } from "@/components/HomeGrid";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-subtle flex flex-col text-text">
      <header className="flex justify-between items-center px-6 py-4 border-b border-border bg-base shrink-0 text-text">
        <h1 className="text-lg font-bold m-0">Flower Seller</h1>
      </header>

      <main className="flex-1 flex flex-col items-center w-full pt-6 pb-8 px-6 text-text">
        <SearchBar />
        <HomeGrid />
      </main>
    </div>
  );
}
