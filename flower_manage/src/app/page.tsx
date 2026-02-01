"use client";

import { motion } from "framer-motion";
import { Package, AlertTriangle, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useInventoryStore } from "@/store/inventoryStore";
import {
  getDaysSincePurchase,
  getFreshnessStatus,
} from "@/data/mockData";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { FabButton } from "@/components/dashboard/FabButton";
import { Navigation } from "@/components/layout/Navigation";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardPage() {
  const flowers = useInventoryStore((state) => state.flowers);

  const totalStock = flowers.reduce((sum, f) => sum + f.stock, 0);

  const riskOfWaste = flowers.filter((f) => {
    const days = getDaysSincePurchase(f.purchaseDate);
    return getFreshnessStatus(days) === "danger";
  }).length;

  const totalFlowerTypes = flowers.length;
  const wasteCount = flowers.filter((f) => {
    const days = getDaysSincePurchase(f.purchaseDate);
    return getFreshnessStatus(days) === "danger";
  }).length;
  const lossRate =
    totalFlowerTypes > 0 ? ((wasteCount / totalFlowerTypes) * 100).toFixed(1) : "0";

  const formattedDate = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="fixed bottom-0 left-0 right-0 z-30 md:static md:w-56 md:flex-shrink-0 md:pb-0">
        <div className="hidden md:block md:p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-2xl font-semibold text-primary"
          >
            Bloom
          </motion.div>
        </div>
        <Navigation />
      </aside>

      <main className="flex-1 pb-24 md:pb-12">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              {getGreeting()}
            </h1>
            <p className="mt-2 text-muted-foreground">{formattedDate}</p>
          </motion.div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatusCard
              title="総在庫数"
              value={totalStock.toLocaleString()}
              icon={Package}
              delay={0.1}
            />
            <StatusCard
              title="本日の廃棄予定"
              value={riskOfWaste}
              icon={AlertTriangle}
              delay={0.2}
              variant="warning"
            />
            <StatusCard
              title="今月の廃棄率"
              value={`${lossRate}%`}
              icon={TrendingDown}
              delay={0.3}
              variant="danger"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/inventory"
              className="group block overflow-hidden rounded-2xl border-0 bg-card/80 p-6 shadow-[0_4px_24px_-4px_rgba(74,93,79,0.08)] backdrop-blur-sm transition-all hover:shadow-[0_8px_32px_-4px_rgba(74,93,79,0.12)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-medium text-foreground">
                    在庫一覧を確認
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    全{flowers.length}品目の在庫状況を確認できます
                  </p>
                </div>
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  →
                </motion.span>
              </div>
            </Link>
          </motion.div>
        </div>
      </main>

      <FabButton />
    </div>
  );
}
