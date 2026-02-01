import { ReactNode } from "react";

type FormActionsProps = {
  /** 左側（キャンセル・戻るなど）。省略時は primary のみ右寄せ */
  secondary?: ReactNode;
  /** 右側（登録・送信など） */
  primary: ReactNode;
};

/**
 * フォーム下部のアクションボタンエリア。左＝キャンセル、右＝送信で統一。
 */
export function FormActions({ secondary, primary }: FormActionsProps) {
  return (
    <div
      className={`flex flex-row flex-nowrap items-center gap-4 pt-8 mt-8 border-t border-border text-text ${secondary != null ? "justify-between" : "justify-end"}`}
      role="group"
      aria-label="フォーム操作"
    >
      {secondary != null && <div className="shrink-0 order-1">{secondary}</div>}
      <div className="shrink-0 order-2">{primary}</div>
    </div>
  );
}
