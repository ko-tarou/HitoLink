"use client";

import { ReactNode } from "react";
import { StockInModal } from "@/components/stock-in/StockInModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <StockInModal />
    </>
  );
}
