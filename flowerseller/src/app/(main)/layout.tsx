import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { btn } from "@/lib/ui-classes";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-subtle flex flex-col text-text">
      <header className="flex items-center gap-4 px-6 py-4 border-b border-border bg-base shrink-0 text-text">
        <Link
          href="/"
          className={btn.iconBack}
          aria-label="ホームへ戻る"
        >
          <ArrowLeft className="w-6 h-6" aria-hidden />
        </Link>
        <span className="font-bold text-lg">Flower Seller</span>
      </header>
      <main className="flex-1 overflow-auto text-text">{children}</main>
    </div>
  );
}
