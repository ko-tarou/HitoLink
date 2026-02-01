"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Flower } from "@/data/mockData";
import {
  getDaysSincePurchase,
  getFreshnessStatus,
  getFreshnessProgress,
} from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlowerCardProps {
  flower: Flower;
  index: number;
}

const freshnessColors = {
  fresh: "bg-primary",
  warning: "bg-[#D4A373]",
  danger: "bg-destructive",
};

export function FlowerCard({ flower, index }: FlowerCardProps) {
  const days = getDaysSincePurchase(flower.purchaseDate);
  const status = getFreshnessStatus(days);
  const progress = getFreshnessProgress(days);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden border-0 bg-card/80 shadow-[0_4px_24px_-4px_rgba(74,93,79,0.08)] backdrop-blur-sm transition-all hover:shadow-[0_12px_40px_-4px_rgba(74,93,79,0.12)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={flower.imageUrl}
            alt={flower.nameJa}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <motion.h3
              className="font-serif text-lg font-medium text-white drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              {flower.nameJa}
            </motion.h3>
            <p className="text-xs text-white/90 drop-shadow">{flower.nameEn}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">在庫</span>
            <span className="font-serif text-xl font-semibold text-foreground">
              {flower.stock}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                {flower.unit}
              </span>
            </span>
          </div>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">鮮度</span>
              <span
                className={cn(
                  "text-xs font-medium",
                  status === "fresh" && "text-primary",
                  status === "warning" && "text-[#D4A373]",
                  status === "danger" && "text-destructive"
                )}
              >
                {status === "fresh" && "Fresh"}
                {status === "warning" && "Warning"}
                {status === "danger" && "Danger"}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className={cn("h-full rounded-full", freshnessColors[status])}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              仕入れから{days}日経過
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
