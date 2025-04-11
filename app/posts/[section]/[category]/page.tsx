// app/posts/[section]/[category]/page.tsx
import { getPostList } from "@/lib/posts";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard"; // PostCard 위치에 따라 경로 확인해줘!
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug.join("/")} post={post} />
        ))}
      </div>
    </div>
  );
}
