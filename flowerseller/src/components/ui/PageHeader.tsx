import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  /** 右側に表示するメインアクション（例: 新規登録ボタン） */
  action?: ReactNode;
};

/**
 * 一覧・詳細ページのヘッダー。タイトル左・メインアクション右で統一。
 */
export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <header className="flex flex-row flex-nowrap justify-between items-center gap-4 mb-8 text-text">
      <h2 className="text-xl font-bold m-0 shrink-0">{title}</h2>
      {action != null && (
        <div className="shrink-0">{action}</div>
      )}
    </header>
  );
}
