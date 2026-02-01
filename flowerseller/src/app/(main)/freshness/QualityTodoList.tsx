"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "freshness-completed";
const STRIKETHROUGH_DURATION_MS = 500;

export type TodoBatch = {
  id: string;
  product_id: string;
  quantity: number;
  received_at: string;
  disposal_date: string | null;
  products: {
    id: string;
    name: string;
    disposal_days: number | null;
  } | null;
};

const DEFAULT_DISPOSAL_DAYS = 3;

function getElapsedDays(receivedAt: string): number {
  const received = new Date(receivedAt);
  received.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor(
    (today.getTime() - received.getTime()) / (24 * 60 * 60 * 1000)
  );
}

function loadCompletedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveCompletedIds(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

type Props = {
  batches: TodoBatch[];
};

export function QualityTodoList({ batches }: Props) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [completingIds, setCompletingIds] = useState<Set<string>>(new Set());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completingIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setCompletedIds(loadCompletedIds());
  }, []);

  useEffect(() => {
    if (completingIds.size === 0) return;
    completingIdsRef.current = new Set(completingIds);
    timeoutRef.current = setTimeout(() => {
      const ids = completingIdsRef.current;
      setCompletedIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.add(id));
        saveCompletedIds(next);
        return next;
      });
      setCompletingIds(new Set());
    }, STRIKETHROUGH_DURATION_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [completingIds]);

  const toggleCompleted = useCallback((batchId: string) => {
    setCompletedIds((prev) => {
      if (prev.has(batchId)) {
        const next = new Set(prev);
        next.delete(batchId);
        saveCompletedIds(next);
        return next;
      }
      setCompletingIds((p) => new Set(p).add(batchId));
      return prev;
    });
  }, []);

  const sorted = [...batches].sort((a, b) => {
    const aDone = completedIds.has(a.id);
    const bDone = completedIds.has(b.id);
    if (aDone === bDone) return 0;
    return aDone ? 1 : -1;
  });

  if (batches.length === 0) {
    return (
      <li
        className="px-6 py-10 text-text-muted text-center"
        role="status"
      >
        品質管理すべき在庫はありません
      </li>
    );
  }

  return (
    <>
      {sorted.map((b) => {
        const days = b.products?.disposal_days ?? DEFAULT_DISPOSAL_DAYS;
        const elapsed = getElapsedDays(b.received_at);
        const completed = completedIds.has(b.id);
        const completing = completingIds.has(b.id);
        const isDone = completed || completing;
        return (
          <li
            key={b.id}
            className={cn(
              "px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-text",
              completed && "opacity-70"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-3 min-w-0",
                isDone && "text-text-muted"
              )}
            >
              <div className="relative min-w-0">
                <span className="font-semibold">
                  {b.products?.name ?? "在庫"}
                </span>
                <span className="text-text-muted text-sm ml-2">
                  数量 {Number(b.quantity)}
                </span>
                {completing && (
                  <span
                    className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 origin-left bg-current opacity-60 strikethrough-line"
                    aria-hidden
                  />
                )}
                {completed && !completing && (
                  <span
                    className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-current opacity-60"
                    aria-hidden
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative text-sm text-text-muted">
                入荷 {formatDate(b.received_at)}
                <span className="ml-2">
                  （{days}日で表示・経過{elapsed}日）
                </span>
                {completing && (
                  <span
                    className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 origin-left bg-current opacity-60 strikethrough-line"
                    aria-hidden
                  />
                )}
                {completed && !completing && (
                  <span
                    className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-current opacity-60"
                    aria-hidden
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleCompleted(b.id)}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-base px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={completed ? "未完了に戻す" : "完了にする"}
              >
                完了
                <span
                  className="inline-block w-6 h-6 shrink-0 rounded-full border-2 border-primary bg-primary-light"
                  aria-hidden
                />
              </button>
            </div>
          </li>
        );
      })}
    </>
  );
}
