import Link from "next/link";
import { getCultivationBatches } from "@/lib/actions/cultivation";
import { Plus } from "lucide-react";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";
import { CultivationGrowingList } from "./CultivationGrowingList";

/** 生産者: 栽培管理（現在栽培中の花・収穫率・数を管理。品目一覧・品目登録はなし） */
export default async function ProducerCultivationPage() {
  const growingBatches = await getCultivationBatches("growing");

  return (
    <div className={pageContainer}>
      <section className="mb-8" aria-labelledby="cultivation-growing-heading">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <h2 id="cultivation-growing-heading" className="text-xl font-bold text-text m-0">
            現在栽培中の花
          </h2>
          <Link
            href="/producer/cultivation/new"
            className={btn.primary}
            aria-label="栽培を追加"
          >
            <Plus className="w-5 h-5" aria-hidden /> 栽培を追加
          </Link>
        </div>
        <p className="text-sm text-text-muted mb-4">
          植付数・収穫率・開始日・予定収穫日を管理します。収穫したら「収穫登録」で収穫数と収穫率を記録してください。
        </p>
        <div className="rounded-xl bg-base border-2 border-border overflow-hidden">
          <CultivationGrowingList batches={growingBatches} />
        </div>
      </section>
    </div>
  );
}
