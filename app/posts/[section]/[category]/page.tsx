import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HydrateHeader from "@/components/HydrateHeader";
import InfinitePostList from "@/components/InfinitePostList";
import { getPostList } from "@/lib/posts";
import { generateCategoryPageParams } from "@/lib/generateStaticParams";
import { getMetadata } from "@/lib/getMetaData";
import { removeKebab } from "@/lib/stringUtils";

interface CategoryPageProps {
  params: {
    section: string;
    category: string;
  };
}

const hi = "";

export type Params = Promise<CategoryPageProps["params"]>;

export const dynamic = "force-static";
export async function generateStaticParams() {
  return await generateCategoryPageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { section, category } = await params;

  return getMetadata({
    title: `${removeKebab(section)} > ${removeKebab(category)}`,
    description: `${removeKebab(section)} > ${removeKebab(
      category
    )} 카테고리에 관한 포스트 목록입니다.`,
    asPath: `/posts/${section}/${category}`,
  });
}

export default async function CategoryPage(props: { params: Params }) {
  const { section, category } = await props.params;
  const posts = await getPostList(section, category);

  if (!posts || posts.length === 0) return notFound();

  return (
    <div className="max-w-3xl mx-auto w-full space-y-4">
      <HydrateHeader
        title={`${removeKebab(section)} > ${removeKebab(category)}`}
        type="category"
      />
      <h1 className="p-4 mt-3 mb-10 text-center text-4xl font-bold">
        {`${removeKebab(section)} > ${removeKebab(category)}`}
      </h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
