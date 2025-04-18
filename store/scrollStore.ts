// store.ts
import { create } from "zustand";

type Store = {
  visibleCount: number;
  setVisibleCount: (count: number) => void;
};

export const useScrollStore = create<Store>((set) => ({
  visibleCount: 5,
  setVisibleCount: (count) => set({ visibleCount: count }),
}));
