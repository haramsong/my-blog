import { Metadata } from "next";

import InfinitePostList from "@/components/InfinitePostList";
import { getPostsByTag } from "@/lib/posts";
import { getMetadata } from "@/lib/getMetaData";
import { generateTagPageParams } from "@/lib/generateStaticParams";
import { removeKebab } from "@/lib/stringUtils";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export type Params = Promise<TagPageProps["params"]>;

export const dynamic = "force-static";
export function generateStaticParams() {
  return generateTagPageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { tag } = await params;

  return getMetadata({
    title: `#${removeKebab(tag)}`,
    description: `${removeKebab(tag)} 태그에 관한 포스트 목록입니다.`,
    asPath: `/posts/tags/${tag}`,
  });
}

export default async function TagPage(props: { params: Params }) {
  const { tag } = await props.params;
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-3xl w-full space-y-4">
      <h1
        aria-label={`${removeKebab(tag)} 태그 글 모음`}
        className="p-4 mt-3 mb-10 text-center text-4xl font-extrabold"
      >
        #{removeKebab(tag)}
      </h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
