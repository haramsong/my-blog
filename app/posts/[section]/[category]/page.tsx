import { notFound } from "next/navigation";

import InfinitePostList from "@/components/InfinitePostList";
import { getPostList } from "@/lib/posts";
import { generateCategoryParams } from "@/lib/staticParams";

interface PageProps {
  params: {
    section: string;
    category: string;
  };
}

export async function generateStaticParams() {
  return await generateCategoryParams();
}

export default async function CategoryPage({ params }: PageProps) {
  const { section, category } = await params;
  const decodedSection = decodeURIComponent(section);
  const decodedCategory = decodeURIComponent(category);
  const posts = await getPostList(decodedSection, decodedCategory);

  if (!posts || posts.length === 0) return notFound();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">
        {decodedSection} / {decodedCategory}
      </h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
