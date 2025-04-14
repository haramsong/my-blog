import PostCard from "@/components/PostCard";
import { getPostsByTag, getTagsWithCount } from "@/lib/posts";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export function generateStaticParams() {
  const tagCounts = Object.entries(getTagsWithCount());
  return tagCounts.map(([tag]) => ({ tag }));
}

export default function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">#{decodedTag}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug.join("/")} post={post} />
        ))}
      </div>
    </div>
  );
}
