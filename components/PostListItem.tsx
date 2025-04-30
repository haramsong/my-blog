"use client";

import Link from "next/link";

import { PostMeta } from "@/lib/posts";
import { TagIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface PostListItemProps {
  post: PostMeta;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <div>
      <Link
        href={`/posts/${post.slug.join("/")}`}
        className="relative p-1.5 shadow-lg flex items-center h-50 overflow-hidden transition hover:opacity-80 hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-4">
          <h1 className="text-3xl mb-2 font-semibold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-md mb-2 text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
            {post.summary}
          </p>
          <div className="flex flex-wrap items-center">
            <TagIcon className="w-4 h-4 mr-1" />
            <span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-800 mr-1 dark:text-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </span>
            <CalendarIcon className="w-4 h-4 ml-3 mr-1" />
            <span className="text-xs">{post.date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
