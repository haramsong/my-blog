"use client";

import { useEffect } from "react";
import { useHeaderStore } from "@/store/headerStore";

type Props = {
  title: string;
  section?: string;
  category?: string;
  type?: "default" | "category" | "detail" | "tag";
};

export default function HydrateHeader({
  title,
  section,
  category,
  type = "default",
}: Props) {
  const setHeader = useHeaderStore((s) => s.setHeader);

  useEffect(() => {
    setHeader({ title, section, category, type });
  }, [title, section, category, type, setHeader]);

  return null;
}
