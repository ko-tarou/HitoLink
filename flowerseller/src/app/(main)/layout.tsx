import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { HeaderTitle } from "@/components/ui/HeaderTitle";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { getMe } from "@/lib/actions/me";
import { btn } from "@/lib/ui-classes";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();
  return (
    <div className="min-h-screen bg-base-subtle flex flex-col text-text">
      <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-base shrink-0 text-text">
        <div className="flex items-center gap-4 min-w-0">
          <BackButton />
          <HeaderTitle />
        </div>
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
      <main className="flex-1 overflow-auto text-text">{children}</main>
    </div>
  );
}
