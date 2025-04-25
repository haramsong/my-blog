import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
    <div className="relative flex justify-center">
      <article className="p-4 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center">{post.title}</h1>
        <p className="text-sm text-gray-400 text-right mt-2">{post.date}</p>
        <div
          className="prose dark:prose-invert my-6 max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              typeof post.contentHtml === "string" ? post.contentHtml : "",
          }}
        />
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-8">
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
