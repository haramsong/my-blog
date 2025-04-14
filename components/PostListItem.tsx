"use client";

import Link from "next/link";
import Image from "next/image";

import { PostMeta } from "@/lib/posts";

interface PostListItemProps {
  post: PostMeta;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <Link
      href={`/${post.slug.join("/")}`}
      className="flex flex-col sm:flex-row gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded transition-colors"
    >
      <div className="relative w-full sm:w-40 h-40 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
          {post.summary}
        </p>
        <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-2">
          <span>{post.date}</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
