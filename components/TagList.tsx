"use client";

import Link from "next/link";

import { usePostContext } from "@/context/PostContext";
import { removeKebab } from "@/lib/stringUtils";

export default function TagList() {
  const { tags } = usePostContext();
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mt-2">
      <h2 className="font-semibold mb-2">Tags</h2>
      <div
        className="flex flex-wrap gap-2 pl-3 border-l"
        style={{
          borderColor: "var(--border)",
        }}
      >
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            #{removeKebab(tag)}
            <span className="ml-1 text-xs opacity-70">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
