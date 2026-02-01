"use client";

import { useEffect, useRef } from "react";
import { btn } from "@/lib/ui-classes";

type ConfirmDialogProps = {
  /** ダイアログの見出し */
  title: string;
  /** 本文メッセージ */
  message: string;
  /** 確定ボタンのラベル（例: 削除する） */
  confirmLabel: string;
  /** キャンセルボタンのラベル */
  cancelLabel?: string;
  /** 確定が危険な操作か（true なら赤ボタン） */
  danger?: boolean;
  /** 確定クリック時の処理。Promise を返すとロード中はボタン無効 */
  onConfirm: () => void | Promise<void>;
  /** キャンセルまたはオーバーレイクリック・Escape 時の処理 */
  onCancel: () => void;
  /** ロード中（確定処理実行中） */
  loading?: boolean;
};

/**
 * 確認ダイアログ。デジタル庁デザインシステム準拠（8pxグリッド・フォーカス可視・aria）。
 */
export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel = "キャンセル",
  danger = false,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      previouslyFocused?.focus();
    };
  }, []);

  const handleConfirm = () => {
    const result = onConfirm();
    if (result instanceof Promise) {
      result.catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="bg-base rounded-xl border-2 border-border shadow-xl w-full max-w-md overflow-hidden text-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4">
          <h2 id="confirm-dialog-title" className="text-xl font-bold text-text m-0 mb-2">
            {title}
          </h2>
          <p id="confirm-dialog-desc" className="text-base text-text m-0">
            {message}
          </p>
        </div>
        <div
          className="flex flex-row flex-nowrap items-center justify-center gap-4 px-6 py-4 border-t border-border bg-base-subtle"
          role="group"
          aria-label="操作"
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={btn.secondary}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={danger ? btn.danger : btn.primary}
          >
            {loading ? "処理中..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
