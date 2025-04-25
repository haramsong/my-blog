"use client";

import { usePathname } from "next/navigation";

import TagList from "@/components/TagList";

export default function Sidebar() {
  const pathname = usePathname();
  const isPostPage = /^\/posts\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname);
  if (isPostPage) return null;

  return (
    <aside className="w-full p-4 h-full">
      <TagList />
    </aside>
  );
}
