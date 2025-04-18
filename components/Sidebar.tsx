"use client";

import { usePathname } from "next/navigation";

import TagList from "@/components/TagList";

interface TagSidebarProps {
  tagCounts: Record<string, number>;
}

export default function Sidebar({ tagCounts }: TagSidebarProps) {
  const pathname = usePathname();
  const isPostPage = /^\/posts\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname);
  if (isPostPage) return null;

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <aside className="w-full p-4 h-full">
      <TagList sortedTags={sortedTags} />
    </aside>
  );
}
