"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useInventoryStore } from "@/store/inventoryStore";

export function FabButton() {
  const openModal = useInventoryStore((state) => state.openStockInModal);

  return (
    <motion.button
      onClick={openModal}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_32px_-4px_rgba(74,93,79,0.35)] md:bottom-8 md:right-8 md:h-16 md:w-16"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, boxShadow: "0 12px 40px -4px rgba(74,93,79,0.4)" }}
      whileTap={{ scale: 0.95 }}
      aria-label="新規入荷"
    >
      <Plus className="h-6 w-6 md:h-7 md:w-7" />
    </motion.button>
  );
}
