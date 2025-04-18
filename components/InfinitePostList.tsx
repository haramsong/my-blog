"use client";

import { useEffect, useRef, useState } from "react";

import PostListItem from "@/components/PostListItem";
import { PostMeta } from "@/lib/posts";

const CHUNK_SIZE = 5;

export default function InfinitePostList({
  allPosts,
}: {
  allPosts: PostMeta[];
}) {
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setVisibleCount((prev) => prev + CHUNK_SIZE);
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [hasMore]);

  return (
    <ul className="space-y-2">
      {visiblePosts.map((post) => (
        <PostListItem key={post.slug.join("/")} post={post} />
      ))}
      {hasMore && (
        <div ref={loaderRef} className="py-8 text-center text-sm text-gray-500">
          불러오는 중...
        </div>
      )}
    </ul>
  );
}
