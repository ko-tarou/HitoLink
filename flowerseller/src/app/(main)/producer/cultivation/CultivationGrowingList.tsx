"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { updateCultivationBatch, deleteCultivationBatch } from "@/lib/actions/cultivation";
import type { CultivationBatch } from "@/lib/actions/cultivation";
import { btn } from "@/lib/ui-classes";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { inputBase, labelBase } from "@/lib/ui-classes";

type Props = {
  batches: CultivationBatch[];
};

export function CultivationGrowingList({ batches }: Props) {
  const router = useRouter();
  const [harvestingId, setHarvestingId] = useState<string | null>(null);
  const [quantityHarvested, setQuantityHarvested] = useState("");
  const [harvestRate, setHarvestRate] = useState("");
  const [harvestError, setHarvestError] = useState("");
  const [harvestLoading, setHarvestLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleHarvestSubmit = async () => {
    if (!harvestingId) return;
    const qty = Number(quantityHarvested);
    if (Number.isNaN(qty) || qty < 0) {
      setHarvestError("収穫数を0以上の数で入力してください");
      return;
    }
    const rate = harvestRate === "" ? undefined : Number(harvestRate);
    if (rate !== undefined && (Number.isNaN(rate) || rate < 0 || rate > 100)) {
      setHarvestError("収穫率は0〜100で入力してください");
      return;
    }
    setHarvestError("");
    setHarvestLoading(true);
    try {
      await updateCultivationBatch(harvestingId, {
        quantity_harvested: qty,
        harvest_rate: rate,
        status: "harvested",
      });
      setHarvestingId(null);
      setQuantityHarvested("");
      setHarvestRate("");
      router.refresh();
    } catch (e) {
      setHarvestError(e instanceof Error ? e.message : "更新に失敗しました");
    } finally {
      setHarvestLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteCultivationBatch(id);
      setDeleteId(null);
      router.refresh();
    } finally {
      setDeleteLoading(false);
    }
  };

  if (batches.length === 0) {
    return (
      <p className="px-6 py-8 text-text-muted text-center" role="status">
        現在栽培中の花はありません。「栽培を追加」から登録してください。
      </p>
    );
  }

  return (
    <>
      <ul className="divide-y divide-border" role="list">
        {batches.map((b) => (
          <li key={b.id} className="px-6 py-4 flex flex-wrap items-center gap-4 text-text">
            <div className="min-w-0 flex-1 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 text-sm">
              <div>
                <span className="text-text-muted block">品目</span>
                <span className="font-medium">{b.product_name}</span>
              </div>
              <div>
                <span className="text-text-muted block">植付数</span>
                <span>{b.quantity_planted}</span>
              </div>
              <div>
                <span className="text-text-muted block">収穫率</span>
                <span>{b.harvest_rate != null ? `${b.harvest_rate}%` : "—"}</span>
              </div>
              <div>
                <span className="text-text-muted block">開始日</span>
                <span>{formatDate(b.started_at)}</span>
              </div>
              <div>
                <span className="text-text-muted block">予定収穫日</span>
                <span>{b.expected_harvest_at ? formatDate(b.expected_harvest_at) : "—"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {harvestingId === b.id ? (
                <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-base-subtle">
                  <div>
                    <label htmlFor={`harvest-qty-${b.id}`} className={labelBase}>
                      収穫数
                    </label>
                    <input
                      id={`harvest-qty-${b.id}`}
                      type="number"
                      min={0}
                      step={0.01}
                      value={quantityHarvested}
                      onChange={(e) => setQuantityHarvested(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor={`harvest-rate-${b.id}`} className={labelBase}>
                      収穫率（％・任意）
                    </label>
                    <input
                      id={`harvest-rate-${b.id}`}
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      value={harvestRate}
                      onChange={(e) => setHarvestRate(e.target.value)}
                      className={inputBase}
                      placeholder="0–100"
                    />
                  </div>
                  {harvestError && (
                    <p className="text-error text-sm" role="alert">
                      {harvestError}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setHarvestingId(null);
                        setHarvestError("");
                        setQuantityHarvested("");
                        setHarvestRate("");
                      }}
                      className={btn.secondary}
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      onClick={handleHarvestSubmit}
                      disabled={harvestLoading}
                      className={btn.primary}
                    >
                      {harvestLoading ? "登録中..." : "収穫を登録"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setHarvestingId(b.id)}
                    className={btn.primary}
                  >
                    収穫登録
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(b.id)}
                    className={btn.danger}
                    aria-label={`${b.product_name}の栽培を削除`}
                  >
                    削除
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {deleteId && (
        <ConfirmDialog
          title="栽培を削除"
          message="この栽培記録を削除してもよろしいですか？"
          confirmLabel="削除する"
          danger
          loading={deleteLoading}
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
}
