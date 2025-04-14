"use client";

import Link from "next/link";

import { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug.join("/")}`}>
      <div className="bg-white rounded shadow hover:shadow-lg overflow-hidden cursor-pointer">
        <div
          className="h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.thumbnail})` }}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.summary}</p>
          <p className="text-xs text-gray-400 mt-2">{post.date}</p>
        </div>
      </div>
    </Link>
  );
}
