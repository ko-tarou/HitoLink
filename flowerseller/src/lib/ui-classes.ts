/**
 * ボタン・リンクの見た目を統一するクラス（配置はコンポーネント側で制御）
 */
export const btn = {
  /** メインアクション（登録・検索・適用など） */
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3 text-base font-semibold hover:bg-primary-hover disabled:opacity-50 transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[48px]",
  /** サブアクション（キャンセル・戻るなど） */
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-base text-text px-6 py-3 text-base font-medium hover:bg-base-muted transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[48px]",
  /** ヘッダー内の戻るアイコン用 */
  iconBack:
    "inline-flex items-center justify-center p-3 rounded-lg bg-base-subtle text-text border border-border hover:bg-base-muted transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-w-[48px] min-h-[48px]",
} as const;

/** ページコンテナ（一覧・詳細） */
export const pageContainer = "mx-auto px-6 py-6 max-w-4xl";
/** フォームページ用コンテナ（幅狭め） */
export const formContainer = "mx-auto px-6 py-6 max-w-2xl";
