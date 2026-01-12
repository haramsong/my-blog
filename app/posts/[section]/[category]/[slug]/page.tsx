import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

import ArrowLeftIcon from "@/public/icons/arrow-left.svg";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import CalendarIcon from "@/public/icons/calendar.svg";
import ClockIcon from "@/public/icons/clock.svg";
import EyeIcon from "@/public/icons/eye.svg";
import FolderIcon from "@/public/icons/folder.svg";
import TagIcon from "@/public/icons/tag.svg";

import HydrateHeader from "@/components/HydrateHeader";
import Giscus from "@/components/Giscus";
import PostSidebar from "@/components/PostSidebar";
import ViewCounter from "@/components/ViewCounter";
import { buildArticleJsonLd } from "@/lib/buildArticleJsonLd";
import { getPostBySlugArray, getPrevNextPost } from "@/lib/posts";
import { generatePostPageParams } from "@/lib/generateStaticParams";
import { getMetadata } from "@/lib/getMetaData";
import { getWebpSrc } from "@/lib/getWebpSrc";
import { removeKebab } from "@/lib/stringUtils";

interface PostPageProps {
  params: {
    section: string;
    category: string;
    slug: string;
  };
}

export type Params = Promise<PostPageProps["params"]>;

export const dynamic = "force-static";
export async function generateStaticParams() {
  return await generatePostPageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { section, category, slug } = await params;
  const post = await getPostBySlugArray([section, category, slug]);

  if (!post) return notFound();

  return getMetadata({
    title: `[${removeKebab(category)}] ${post.title}`,
    asPath: `/posts/${section}/${category}/${slug}`,
    description: post.summary,
    ogImage: post.thumbnail,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    tags: post.tags,
  });
}

export default async function PostPage(props: { params: Params }) {
  const { section, category, slug } = await props.params;

  const post = await getPostBySlugArray([section, category, slug]);
  const { prev, next } = await getPrevNextPost(section, category, slug);

  if (!post) return notFound();

  return (
    <div className="relative flex-1">
      <Script
        id="post-article-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildArticleJsonLd({
              title: post.title,
              summary: post.summary,
              thumbnail: post.thumbnail,
              slug: post.slug,
              date: post.date,
              tags: post.tags,
            })
          ),
        }}
      />
      <HydrateHeader
        title={post?.title ?? ""}
        section={post.section}
        category={post.category}
        type="detail"
      />
      <article className="px-5 mx-auto max-w-4xl">
        <div className="relative flex items-center h-55 overflow-hidden">
          <Image
            src={getWebpSrc(post.thumbnail)}
            alt={post.title}
            fill
            priority
            className="absolute inset-0 w-full h-full object-cover object-center opacity-10"
          />
          <h1 className="text-4xl p-6 font-bold">{`[${removeKebab(category)}] ${
            post.title
          }`}</h1>
        </div>
        <div className="justify-between flex">
          <span className="flex items-center mt-5 text-xs text-gray-600 dark:text-gray-400">
            <FolderIcon aria-hidden="true" className="w-4 h-4 mr-1" />
            <Link
              href={`/posts/${post.section}/${post.category}`}
              aria-label={`${removeKebab(post.section)} 섹션의 ${removeKebab(
                post.category
              )} 카테고리 보기`}
              className="hover:underline"
            >
              {`${removeKebab(post.section)} > ${removeKebab(post.category)}`}
            </Link>
          </span>
          <div className="flex flex-row-reverse items-center mt-5 text-xs text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <EyeIcon aria-hidden="true" className="w-4 h-4 mr-1" />
              <ViewCounter slug={post.slug} />
            </span>
            <span className="flex items-center mr-3">
              <ClockIcon aria-hidden="true" className="w-4 h-4 mr-1" />
              <p>{`${post.readingTime} 분`}</p>
            </span>
            <span className="flex items-center mr-3">
              <CalendarIcon aria-hidden="true" className="w-4 h-4 mr-1" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
          </div>
        </div>
        {typeof post.contentHtml === "string" ? (
          <>
            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg font-semibold">
              {post.summary}
            </p>
            <div
              className="prose dark:prose-invert mt-8 max-w-[calc(100vw-2.5rem)]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </>
        ) : (
          <div className="prose dark:prose-invert mt-8 max-w-none text-red-500">
            포스트 내용을 불러올 수 없습니다.
          </div>
        )}
        <div className="flex items-center my-8 mt-10 text-xs text-gray-500 dark:text-gray-400">
          <TagIcon aria-hidden="true" className="w-6 h-6 mr-1" />
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  aria-label={`${tag} 태그 보기`}
                  className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  #{removeKebab(tag)}
                </Link>
              ))}
            </div>
          )}
        </div>

        {(prev || next) && (
          <div className="flex justify-between my-10 gap-4">
            {prev ? (
              <div className="group">
                <Link
                  href={`/posts/${prev.slug.join("/")}`}
                  aria-label="이전 글 보기"
                  className="w-60 h-20 border rounded-lg group-hover:border-orange-500 transition-colors
                   flex flex-col justify-center items-center text-center p-2"
                >
                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="w-8 h-8 group-hover:text-orange-500 mb-2"
                  />
                  <span className="w-full overflow-hidden whitespace-nowrap group-hover:text-orange-500 truncate text-sm font-normal">
                    {prev.title}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="w-60 h-20" />
            )}

            {next ? (
              <div className="group">
                <Link
                  href={`/posts/${next.slug.join("/")}`}
                  aria-label="다음 글 보기"
                  className="w-60 h-20 border rounded-lg group-hover:border-orange-500 transition-colors
                  flex flex-col justify-center items-center text-center p-2"
                >
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="w-8 h-8 group-hover:text-orange-500 mb-2"
                  />
                  <span className="w-full overflow-hidden whitespace-nowrap group-hover:text-orange-500 truncate text-sm font-normal">
                    {next.title}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="w-60 h-20" />
            )}
          </div>
        )}
        <Giscus />
      </article>
      <PostSidebar toc={post.toc} />
    </div>
  );
}
