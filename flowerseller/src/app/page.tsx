import Link from "next/link";
import { HomeGrid } from "@/components/HomeGrid";
import { SearchBar } from "@/components/SearchBar";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { getMe } from "@/lib/actions/me";
import { btn } from "@/lib/ui-classes";

// 常にDBのアカウント・業態を取得して表示する（キャッシュで古い業態が出ないようにする）
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const me = await getMe();
  return (
    <div className="min-h-screen bg-base-subtle flex flex-col text-text">
      <header className="flex justify-between items-center gap-4 px-6 py-4 border-b border-border bg-base shrink-0 text-text">
        <h1 className="text-lg font-bold m-0">Flower Seller</h1>
        <nav className="flex items-center gap-3 shrink-0" aria-label="アカウント操作">
          <Link
            href="/settings"
            className={btn.secondary}
          >
            {me?.organization_name ? `${me.organization_name}について管理` : "アカウント管理"}
          </Link>
          <LogoutButton />
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center w-full pt-6 pb-8 px-6 text-text">
        <SearchBar />
        <HomeGrid businessType={me?.business_type ?? ""} />
      </main>
    </div>
  );
}
