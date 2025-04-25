import { create } from "zustand";

type ScrollStore = {
  visibleCount: number;
  setVisibleCount: (count: number) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
  visibleCount: 10,
  setVisibleCount: (count) => set({ visibleCount: count }),
}));
