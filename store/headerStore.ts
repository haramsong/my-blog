import { create } from "zustand";

type HeaderState = {
  title: string;
  section?: string;
  category?: string;
  type: "default" | "category" | "detail" | "tag";
  setHeader: (data: {
    title: string;
    section?: string;
    category?: string;
    type: HeaderState["type"];
  }) => void;
};

export const useHeaderStore = create<HeaderState>((set) => ({
  title: "전체 글",
  section: undefined,
  category: undefined,
  type: "default",
  setHeader: (data) => set(data),
}));
