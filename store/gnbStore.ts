import { create } from "zustand";

type GNBStore = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export const useGNBStore = create<GNBStore>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed: collapsed }),
}));
