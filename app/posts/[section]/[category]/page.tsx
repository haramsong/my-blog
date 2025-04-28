import { notFound } from "next/navigation";

import InfinitePostList from "@/components/InfinitePostList";
import { getPostList } from "@/lib/posts";
import { generateCategoryPageParams } from "@/lib/generateStaticParams";
import { removeKebab } from "@/lib/stringUtils";

interface CategoryPageProps {
  params: {
    section: string;
    category: string;
  };
}

export const dynamic = "force-static";
export async function generateStaticParams() {
  return await generateCategoryPageParams();
}

export type Params = Promise<CategoryPageProps["params"]>;

export default async function CategoryPage(props: { params: Params }) {
  const { section, category } = await props.params;
  const posts = await getPostList(section, category);

  if (!posts || posts.length === 0) return notFound();

  return (
    <div className="max-w-3xl w-full space-y-4">
      <h1 className="p-4 mt-3 mb-10 text-center text-4xl font-extrabold">
        {removeKebab(section)} / {removeKebab(category)}
      </h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
