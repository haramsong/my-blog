import InfinitePostList from "@/components/InfinitePostList";
import { getPostsByTag } from "@/lib/posts";
import { generateTagPageParams } from "@/lib/generateStaticParams";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export function generateStaticParams() {
  return generateTagPageParams();
}

export default function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">#{decodedTag}</h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
