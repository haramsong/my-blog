"use client";

import Link from "next/link";

import { usePostContext } from "@/context/PostContext";
import { removeKebab } from "@/lib/stringUtils";

export default function TagList() {
  const { tags } = usePostContext();
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <section className="mt-2">
      <h2 className="font-semibold mb-2">태그</h2>
      <ul
        className="flex flex-wrap gap-2 pl-3 border-l"
        style={{
          borderColor: "var(--border)",
        }}
      >
        {sortedTags.map(([tag, count]) => (
          <li
            key={tag}
            className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            <Link
              href={`/tags/${tag}/`}
              aria-label={`${removeKebab(tag)} 태그 보기`}
            >
              #{removeKebab(tag)}
              <span className="ml-1 text-xs opacity-70">({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
