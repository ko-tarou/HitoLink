import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-maroon flex flex-col">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-white/20">
        <Link
          href="/"
          className="p-3 rounded-xl bg-white/15 text-white hover:bg-white/25 transition flex items-center justify-center border-2 border-white/25"
          aria-label="ホームへ"
        >
          <ArrowLeft className="w-8 h-8" />
        </Link>
        <span className="text-white font-bold text-lg">Flower Seller</span>
      </header>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
