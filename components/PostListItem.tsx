"use client";

import Link from "next/link";
import Image from "next/image";

import { PostMeta } from "@/lib/posts";

interface PostListItemProps {
  post: PostMeta;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <div>
      <Link
        href={`/posts/${post.slug.join("/")}`}
        className="relative flex items-center h-70 overflow-hidden transition hover:opacity-80 hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        {/* 배경 이미지 */}
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="absolute inset-0 w-full h-full object-cover object-center opacity-10"
        />

        {/* 텍스트 레이어 */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-4">
          <h1 className="text-5xl text-center font-semibold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
            {post.summary}
          </p>
          <div className="text-gray-500 mt-2 flex flex-wrap justify-between">
            <span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-md bg-gray-200 dark:bg-gray-700 text-gray-800 mx-1 dark:text-gray-200 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </span>
            <span className="text-sm">{post.date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
