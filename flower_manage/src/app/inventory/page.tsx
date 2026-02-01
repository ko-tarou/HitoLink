"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInventoryStore } from "@/store/inventoryStore";
import { getFreshnessStatus } from "@/data/mockData";
import { FlowerCard } from "@/components/inventory/FlowerCard";
import {
  InventoryFilters,
  type SortOrder,
} from "@/components/inventory/InventoryFilters";
import { FabButton } from "@/components/dashboard/FabButton";
import { Navigation } from "@/components/layout/Navigation";

export default function InventoryPage() {
  const flowers = useInventoryStore((state) => state.flowers);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [freshnessFilter, setFreshnessFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const filteredFlowers = useMemo(() => {
    const filtered = flowers.filter((flower) => {
      const categoryMatch =
        categoryFilter === "all" || flower.category === categoryFilter;
      const days =
        Math.floor(
          (Date.now() - new Date(flower.purchaseDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );
      const status = getFreshnessStatus(days);
      const freshnessMatch =
        freshnessFilter === "all" || status === freshnessFilter;
      return categoryMatch && freshnessMatch;
    });

    if (sortOrder === "aiueo") {
      return [...filtered].sort((a, b) =>
        a.nameJa.localeCompare(b.nameJa, "ja")
      );
    }
    return filtered;
  }, [flowers, categoryFilter, freshnessFilter, sortOrder]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="fixed bottom-0 left-0 right-0 z-30 md:static md:w-56 md:flex-shrink-0 md:pb-0">
        <div className="hidden md:block md:p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/"
              className="block font-serif text-2xl font-semibold text-primary transition-colors hover:text-primary/90"
            >
              Bloom
            </Link>
          </motion.div>
        </div>
        <Navigation />
      </aside>

      <main className="flex-1 pb-24 md:pb-12">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              在庫一覧
            </h1>
            <p className="mt-2 text-muted-foreground">
              全{flowers.length}品目の在庫を管理
            </p>
          </motion.div>

          <div className="mb-8">
            <InventoryFilters
              categoryFilter={categoryFilter}
              freshnessFilter={freshnessFilter}
              sortOrder={sortOrder}
              onCategoryChange={setCategoryFilter}
              onFreshnessChange={setFreshnessFilter}
              onSortOrderChange={setSortOrder}
            />
          </div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.03,
                },
              },
              hidden: {},
            }}
          >
            {filteredFlowers.length > 0 ? (
              filteredFlowers.map((flower, index) => (
                <FlowerCard key={flower.id} flower={flower} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center rounded-2xl border-0 bg-card/50 py-20 text-center"
              >
                <p className="font-serif text-xl text-muted-foreground">
                  該当する在庫がありません
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  フィルターを変更してください
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <FabButton />
    </div>
  );
}
