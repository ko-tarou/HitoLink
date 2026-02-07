"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/actions/me";
import { btn, formContainer, inputBase, labelBase, selectBase } from "@/lib/ui-classes";

const BUSINESS_TYPE_OPTIONS = [
  { value: "", label: "未設定" },
  { value: "seller", label: "販売者" },
  { value: "producer", label: "生産者" },
  { value: "intermediary", label: "仲介者" },
] as const;

type Props = {
  initialOrganizationName: string;
  initialBusinessType: string;
};

export function SettingsForm({
  initialOrganizationName,
  initialBusinessType,
}: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [businessType, setBusinessType] = useState(initialBusinessType);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await updateMe({
      ...(password ? { password } : {}),
      business_type: businessType,
    });

    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setSuccess(true);
    setPassword("");
    router.refresh();
    // 業態を変えた場合にホームのタイルをすぐ反映させるためホームへ遷移
    router.push("/");
  }

  return (
    <div className={formContainer}>
      <p className="text-text-muted text-sm mb-6">
        団体名: <span className="font-medium text-text">{initialOrganizationName}</span>
        （団体名の変更はできません）
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className={labelBase}>
            パスワード変更（任意）
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputBase}
            placeholder="変更する場合のみ入力"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="business_type" className={labelBase}>
            販売者 / 生産者 / 仲介者
          </label>
          <select
            id="business_type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className={selectBase}
          >
            {BUSINESS_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value || "none"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-error text-sm" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-primary text-sm" role="status">
            保存しました。
          </p>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`${btn.primary} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "保存中..." : "保存"}
          </button>
        </div>
      </form>
    </div>
  );
}
