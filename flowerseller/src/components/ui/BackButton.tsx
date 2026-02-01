"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { btn } from "@/lib/ui-classes";

/**
 * ブラウザの履歴で前のページに戻る。検索結果・商品登録などで「ホームに飛ばない」ようにする。
 */
export function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={btn.iconBack}
      aria-label="前のページへ戻る"
    >
      <ArrowLeft className="w-8 h-8" aria-hidden />
    </button>
  );
}
