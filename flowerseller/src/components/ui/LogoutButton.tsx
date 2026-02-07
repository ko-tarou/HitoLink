"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { btn } from "@/lib/ui-classes";

/**
 * ログアウトボタン。クリックでCookieを削除しログインページへリダイレクト。
 * デジタル庁デザイン: アウトラインボタン・十分なコントラスト・48px以上タッチ領域。
 */
export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={btn.secondary}
      aria-label="ログアウト"
    >
      <LogOut className="w-5 h-5 shrink-0" aria-hidden />
      ログアウト
    </button>
  );
}
