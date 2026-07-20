"use client";

import Image from "next/image";
import Link from "next/link";

import CalendarIcon from "@/public/icons/calendar.svg";
import TagIcon from "@/public/icons/tag.svg";

import { PostMeta } from "@/lib/posts";
import { getSmallThumbnailSrc } from "@/lib/getThumbnailSrc";
import { removeKebab } from "@/lib/stringUtils";

interface PostListItemProps {
  post: PostMeta;
}

export default function PostListItem({ post }: PostListItemProps) {
  const hasThumbnail = Boolean(post.thumbnail) && post.thumbnail !== "/images/file.svg";

  return (
    <article>
      <Link
        href={`/posts/${post.slug.join("/")}/`}
        aria-label={`${post.title} 게시글 이동`}
        className="group relative flex min-h-36 sm:min-h-40 overflow-hidden rounded-lg p-1.5 inset-shadow-sm dark:inset-shadow-gray-200/10 shadow-lg dark:shadow-gray-200/10 transition hover:opacity-90 hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <div
          className={`flex flex-1 min-w-0 flex-col justify-between gap-3 p-4 sm:p-5 ${
            hasThumbnail ? "pr-32 sm:pr-48" : ""
          }`}
        >
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl leading-snug line-clamp-2 font-semibold text-gray-900 dark:text-white">
              {`[${removeKebab(post.category)}] ${post.title}`}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-2">
              {post.summary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-y-1">
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
            <time dateTime={post.date} className="text-xs">
              {post.date}
            </time>
          </div>
        </div>

        {hasThumbnail && (
          <div className="absolute inset-y-1.5 right-1.5 w-28 sm:w-44 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800">
            <Image
              src={getSmallThumbnailSrc(post.thumbnail)}
              alt=""
              fill
              sizes="(max-width: 640px) 112px, 176px"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
