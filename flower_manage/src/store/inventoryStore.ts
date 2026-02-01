import { create } from "zustand";
import type { Flower } from "@/data/mockData";
import { MOCK_FLOWERS } from "@/data/mockData";

interface InventoryState {
  flowers: Flower[];
  isStockInModalOpen: boolean;
  openStockInModal: () => void;
  closeStockInModal: () => void;
  addFlower: (flower: Flower) => void;
  updateFlower: (id: string, updates: Partial<Flower>) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  flowers: MOCK_FLOWERS,
  isStockInModalOpen: false,
  openStockInModal: () => set({ isStockInModalOpen: true }),
  closeStockInModal: () => set({ isStockInModalOpen: false }),
  addFlower: (flower) =>
    set((state) => ({
      flowers: [...state.flowers, { ...flower, id: `flower-${Date.now()}` }],
    })),
  updateFlower: (id, updates) =>
    set((state) => ({
      flowers: state.flowers.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    })),
}));
