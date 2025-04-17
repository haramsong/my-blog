import { notFound } from "next/navigation";

import InfinitePostList from "@/components/InfinitePostList";
import { getPostList } from "@/lib/posts";
import { generateCategoryPageParams } from "@/lib/generateStaticParams";

interface CategoryPageProps {
  params: {
    section: string;
    category: string;
  };
}

export async function generateStaticParams() {
  return await generateCategoryPageParams();
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { section, category } = await params;
  const decodedSection = decodeURIComponent(section);
  const decodedCategory = decodeURIComponent(category);
  const posts = await getPostList(decodedSection, decodedCategory);

  if (!posts || posts.length === 0) return notFound();

  return (
    <div className="space-y-2">
      <h1 className="p-4 text-2xl font-bold">
        {decodedSection} / {decodedCategory}
      </h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
