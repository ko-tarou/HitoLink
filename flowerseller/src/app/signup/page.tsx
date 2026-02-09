"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { btn } from "@/lib/ui-classes";

export default function SignupPage() {
  const router = useRouter();
  const [organizationName, setOrganizationName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organization_name: organizationName,
          password,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          (data as { error?: string })?.error ?? "アカウントの作成に失敗しました"
        );
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("接続エラーが発生しました");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-subtle flex flex-col items-center justify-center px-6 text-text">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-center mb-2">アカウント新規作成</h1>
        <p className="text-center text-sm text-text-muted mb-8">
          Flower Seller
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="org" className="block text-sm font-medium mb-2">
              団体名
            </label>
            <input
              id="org"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-base text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-0"
              placeholder="例: サンプル花屋"
              autoComplete="organization"
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border bg-base text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-0"
              placeholder="パスワード（8文字以上推奨）"
              autoComplete="new-password"
              required
              minLength={1}
            />
          </div>

          {error && (
            <p className="text-error text-sm" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-base text-white transition ${btn.primary} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "作成中..." : "アカウントを作成"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          すでにアカウントをお持ちの方は{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
