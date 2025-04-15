import { notFound } from "next/navigation";

import { getPostBySlugArray } from "@/lib/posts";
import { generatePostPageParams } from "@/lib/generateStaticParams";

import PostSidebar from "@/components/PostSidebar";

interface PostPageProps {
  params: {
    section: string;
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return await generatePostPageParams();
}

export default async function PostPage({ params }: PostPageProps) {
  const { section, category, slug } = await params;

  const post = await getPostBySlugArray([section, category, slug]);

  if (!post) return notFound();

  return (
    <div className="relative flex justify-center">
      <article className="p-4 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center">{post.title}</h1>
        <p className="text-sm text-gray-400 text-right mt-2">{post.date}</p>
        <div
          className="prose dark:prose-invert mt-6 max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              typeof post.contentHtml === "string" ? post.contentHtml : "",
          }}
        />
      </article>
      <PostSidebar toc={post.toc} />
    </div>
  );
}
