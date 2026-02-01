"use client";

import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_LABELS } from "@/data/mockData";
import type { FlowerCategory } from "@/data/mockData";

interface InventoryFiltersProps {
  categoryFilter: string;
  freshnessFilter: string;
  onCategoryChange: (value: string) => void;
  onFreshnessChange: (value: string) => void;
}

export function InventoryFilters({
  categoryFilter,
  freshnessFilter,
  onCategoryChange,
  onFreshnessChange,
}: InventoryFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-4"
    >
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground">カテゴリ</label>
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[160px] rounded-xl border-0 bg-card/80 shadow-sm">
            <SelectValue placeholder="すべて" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">
              すべて
            </SelectItem>
            {(Object.keys(CATEGORY_LABELS) as FlowerCategory[]).map(
              (category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="rounded-lg"
                >
                  {CATEGORY_LABELS[category]}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground">鮮度</label>
        <Select value={freshnessFilter} onValueChange={onFreshnessChange}>
          <SelectTrigger className="w-[140px] rounded-xl border-0 bg-card/80 shadow-sm">
            <SelectValue placeholder="すべて" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">
              すべて
            </SelectItem>
            <SelectItem value="fresh" className="rounded-lg">
              Fresh (0-3日)
            </SelectItem>
            <SelectItem value="warning" className="rounded-lg">
              Warning (4-6日)
            </SelectItem>
            <SelectItem value="danger" className="rounded-lg">
              Danger (7日+)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}
