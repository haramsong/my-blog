"use client";

import Link from "next/link";

interface TagListProps {
  sortedTags: [string, number][];
}

export default function TagList({ sortedTags }: TagListProps) {
  return (
    <div className="mt-8">
      <h2 className="font-semibold mb-2">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            #{tag}
            <span className="ml-1 text-xs opacity-70">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
