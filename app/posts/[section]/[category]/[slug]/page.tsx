import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TagIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

import Giscus from "@/components/Giscus";
import PostSidebar from "@/components/PostSidebar";
import { getPostBySlugArray, getPrevNextPost } from "@/lib/posts";
import { generatePostPageParams } from "@/lib/generateStaticParams";
import { removeKebab } from "@/lib/stringUtils";

interface PostPageProps {
  params: {
    section: string;
    category: string;
    slug: string;
  };
}

export const dynamic = "force-static";
export async function generateStaticParams() {
  return await generatePostPageParams();
}

export type Params = Promise<PostPageProps["params"]>;

export default async function PostPage(props: { params: Params }) {
  const { section, category, slug } = await props.params;

  const post = await getPostBySlugArray([section, category, slug]);
  const { prev, next } = await getPrevNextPost(section, category, slug);

  if (!post) return notFound();

  return (
    <div className="relative flex">
      <article className="px-5 max-w-3xl min-w-lg w-full">
        <div className="relative flex items-center h-55 overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="absolute inset-0 w-full h-full object-cover object-center opacity-10"
          />
          <h1 className="text-4xl p-6 font-bold">{post.title}</h1>
        </div>
        <div className="flex flex-row-reverse items-center mt-5 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            <p>{post.readingTime} 분</p>
          </span>
          <span className="flex items-center mr-3">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <p>{post.date}</p>
          </span>
        </div>
        <div
          className="prose dark:prose-invert mt-8 max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              typeof post.contentHtml === "string" ? post.contentHtml : "",
          }}
        />
        <div className="flex items-center my-8 mt-10 text-xs text-gray-500 dark:text-gray-400">
          <TagIcon className="w-6 h-6 mr-1" />
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
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
                  className="w-60 h-20 border rounded-lg group-hover:border-orange-500 transition-colors
                   flex flex-col justify-center items-center text-center p-2"
                >
                  <FaArrowLeft className="w-8 h-8 group-hover:text-orange-500 mb-2" />
                  <span className="w-full overflow-hidden whitespace-nowrap group-hover:text-orange-500 truncate text-sm font-medium">
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
                  className="w-60 h-20 border rounded-lg group-hover:border-orange-500 transition-colors
                   flex flex-col justify-center items-center text-center p-2"
                >
                  <FaArrowRight className="w-8 h-8 group-hover:text-orange-500 mb-2" />
                  <span className="w-full overflow-hidden whitespace-nowrap group-hover:text-orange-500 truncate text-sm font-medium">
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
