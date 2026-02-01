"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { formatYen, formatDate, formatDateTime } from "@/lib/utils";
import { selectBase } from "@/lib/ui-classes";

type DayTotal = { date: string; amount: number };

type SaleItem = {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  products?: { name: string } | null;
};

type Sale = {
  id: string;
  total_amount: number;
  payment_method: string;
  created_at: string;
  sale_items?: SaleItem[];
};

type Product = { id: string; name: string; category_id: string | null };
type Category = { id: string; name: string };

const paymentLabel: Record<string, string> = {
  cash: "現金",
  credit: "クレジット",
  paypay: "PayPay",
};

type GraphMode = "all" | "category" | "product";

const DAYS = 14;

function buildDayKeys(): string[] {
  const today = new Date();
  const keys: string[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

function aggregateByDay(
  sales: Sale[],
  opts: { categoryId?: string | null; productId?: string | null; productByCategory?: Map<string, string> }
): DayTotal[] {
  const { categoryId, productId, productByCategory } = opts;
  const keys = buildDayKeys();
  const map = new Map<string, number>();
  keys.forEach((k) => map.set(k, 0));

  for (const s of sales) {
    const dateKey = new Date(s.created_at).toISOString().slice(0, 10);
    if (!map.has(dateKey)) continue;

    if (categoryId != null || productId != null) {
      if (!s.sale_items) continue;
      for (const i of s.sale_items) {
        if (productId != null && i.product_id !== productId) continue;
        if (categoryId != null) {
          const cat = productByCategory?.get(i.product_id);
          if (cat !== categoryId) continue;
        }
        map.set(dateKey, (map.get(dateKey) ?? 0) + i.subtotal);
      }
    } else {
      map.set(dateKey, (map.get(dateKey) ?? 0) + s.total_amount);
    }
  }

  return keys.map((date) => ({ date, amount: map.get(date) ?? 0 }));
}

type Props = {
  data: DayTotal[];
  sales: Sale[];
  products: Product[];
  categories: Category[];
};

export function SalesGraph({ data, sales, products, categories }: Props) {
  const [mode, setMode] = useState<GraphMode>("all");
  const [categoryId, setCategoryId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [tooltip, setTooltip] = useState<{ date: string; amount: number; x: number; y: number } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dropdownRevealed, setDropdownRevealed] = useState(false);
  const [closing, setClosing] = useState(false);
  const [slotCollapsing, setSlotCollapsing] = useState(false);
  const closingFromRef = useRef<GraphMode>("all");

  useEffect(() => {
    if (mode === "category" || mode === "product") {
      setClosing(false);
      setSlotCollapsing(false);
      setDropdownRevealed(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDropdownRevealed(true));
      });
      return () => cancelAnimationFrame(id);
    }
    if (mode === "all" && (closingFromRef.current === "category" || closingFromRef.current === "product")) {
      setDropdownRevealed(false);
      const t1 = setTimeout(() => {
        setSlotCollapsing(true);
      }, 200);
      const t2 = setTimeout(() => {
        setClosing(false);
        setSlotCollapsing(false);
        closingFromRef.current = "all";
      }, 200 + 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    setDropdownRevealed(false);
    setClosing(false);
    setSlotCollapsing(false);
  }, [mode]);

  const handleModeChange = useCallback((next: GraphMode) => {
    if (next === "all" && (mode === "category" || mode === "product")) {
      closingFromRef.current = mode;
      setClosing(true);
      setDropdownRevealed(false);
      setMode("all");
    } else {
      closingFromRef.current = "all";
      setMode(next);
    }
  }, [mode]);

  const productByCategory = useMemo(() => {
    const m = new Map<string, string>();
    products.forEach((p) => {
      if (p.category_id) m.set(p.id, p.category_id);
    });
    return m;
  }, [products]);

  const graphData = useMemo(() => {
    if (mode === "category" && categoryId) {
      return aggregateByDay(sales, { categoryId, productByCategory });
    }
    if (mode === "product" && productId) {
      return aggregateByDay(sales, { productId });
    }
    return data;
  }, [mode, categoryId, productId, sales, data, productByCategory]);

  const hasFilteredData = (mode === "all") || (mode === "category" && categoryId) || (mode === "product" && productId);
  const displayData = hasFilteredData ? graphData : data;

  const salesForDate = selectedDate
    ? sales.filter((s) => new Date(s.created_at).toISOString().slice(0, 10) === selectedDate)
    : [];

  const closeDialog = useCallback(() => setSelectedDate(null), []);

  if (displayData.length === 0) {
    return (
      <div className="rounded-xl bg-base border border-border px-6 py-8 text-center text-text-muted text-sm">
        表示するデータがありません
      </div>
    );
  }
  const maxAmount = Math.max(...displayData.map((d) => d.amount), 1);
  const barHeight = 120;

  return (
    <>
      <div className="rounded-xl bg-base border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex flex-wrap items-center justify-between gap-4 min-h-[64px]">
          <h3 id="sales-graph-heading" className="text-base font-semibold text-text m-0">
            売上グラフ
          </h3>
          <div className="flex items-center gap-2 min-h-[48px]">
            <div
              className="flex rounded-lg border-2 border-border overflow-hidden transition-[box-shadow] duration-200"
              role="tablist"
              aria-label="グラフの表示範囲"
            >
              {[
                { value: "all" as const, label: "全ての商品" },
                { value: "category" as const, label: "カテゴリ" },
                { value: "product" as const, label: "商品名" },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={mode === t.value}
                  aria-controls="sales-graph-panel"
                  id={`sales-tab-${t.value}`}
                  onClick={() => handleModeChange(t.value)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    mode === t.value
                      ? "bg-primary text-white border-primary"
                      : "bg-base text-text border-transparent hover:bg-base-subtle"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div
              className={`overflow-hidden transition-[width,opacity] duration-300 ease-out ${
                mode === "all" && !closing && !slotCollapsing
                  ? "w-0 opacity-0"
                  : "w-[180px] opacity-100"
              }`}
              aria-hidden={mode === "all" && !closing && !slotCollapsing}
            >
              <div
                className={`pt-0.5 transition-all duration-200 ease-out ${
                  dropdownRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                {(mode === "category" || (closing && closingFromRef.current === "category")) && (
                  <select
                    aria-label="カテゴリを選択"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className={`${selectBase} w-full min-w-[120px] text-sm py-2`}
                  >
                    <option value="">選択してください</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}
                {(mode === "product" || (closing && closingFromRef.current === "product")) && (
                  <select
                    aria-label="商品を選択"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className={`${selectBase} w-full min-w-[140px] text-sm py-2`}
                  >
                    <option value="">選択してください</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="sales-graph-panel" className="px-6 py-4 relative" role="tabpanel" aria-labelledby="sales-graph-heading">
          <div className="flex items-end gap-2 min-h-[140px]" style={{ gap: "0.5rem" }}>
            {displayData.map((d) => (
              <button
                key={d.date}
                type="button"
                className="flex-1 min-w-0 flex flex-col items-center gap-1 cursor-pointer border-0 bg-transparent p-0 text-inherit"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({ date: d.date, amount: d.amount, x: rect.left + rect.width / 2, y: rect.top });
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => setSelectedDate(d.date)}
                aria-label={`${formatDate(d.date)}: ${formatYen(d.amount)}。クリックで詳細`}
              >
                <span className="text-xs text-text-muted order-2 truncate w-full text-center">
                  {formatDate(d.date).replace(/\d{4}\/\d{2}\//, "")}
                </span>
                <div
                  className="w-full bg-primary rounded-t transition-all min-h-[4px] order-1 hover:opacity-90"
                  style={{
                    height: `${Math.max(4, (d.amount / maxAmount) * barHeight)}px`,
                  }}
                  aria-hidden
                />
              </button>
            ))}
          </div>
          {tooltip && (
            <div
              className="fixed z-50 px-3 py-2 rounded-lg border-2 border-border bg-base shadow-xl text-sm text-text whitespace-nowrap pointer-events-none"
              style={{
                left: tooltip.x,
                top: tooltip.y - 48,
                transform: "translate(-50%, 0)",
              }}
              role="tooltip"
            >
              {formatDate(tooltip.date)} — {formatYen(tooltip.amount)}
            </div>
          )}
          <p className="text-xs text-text-muted mt-2 text-center">
            最大: {formatYen(maxAmount)}
          </p>
        </div>
      </div>

      {selectedDate && (
        <SalesDayDialog
          date={selectedDate}
          sales={salesForDate}
          onClose={closeDialog}
        />
      )}
    </>
  );
}

function SalesDayDialog({
  date,
  sales,
  onClose,
}: {
  date: string;
  sales: Sale[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sales-day-dialog-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-base rounded-xl border-2 border-border shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col text-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border shrink-0 bg-base">
          <h2 id="sales-day-dialog-title" className="text-xl font-bold text-text m-0">
            {formatDate(date)} の売上
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 border-border bg-base-subtle text-text hover:bg-base-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {sales.length === 0 ? (
            <p className="text-text-muted text-sm">該当する売上はありません</p>
          ) : (
            <ul className="space-y-4 list-none pl-0 m-0" role="list">
              {sales.map((s) => (
                <li key={s.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-text font-medium">
                      {formatDateTime(s.created_at)}
                    </span>
                    <span className="text-base font-bold text-text">
                      {formatYen(s.total_amount)}
                    </span>
                  </div>
                  <span className="inline-block mt-1 px-2.5 py-1 rounded-md text-xs font-medium bg-base-subtle text-text border border-border">
                    {paymentLabel[s.payment_method] ?? s.payment_method}
                  </span>
                  {s.sale_items && s.sale_items.length > 0 && (
                    <ul className="mt-2 pl-0 list-none text-sm text-text-muted space-y-1" role="list">
                      {s.sale_items.map((i) => (
                        <li key={i.id}>
                          {i.products?.name ?? "商品"} × {i.quantity} — {formatYen(i.subtotal)}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
