import InfinitePostList from "@/components/InfinitePostList";
import { getPostMeta } from "@/lib/posts";

export const dynamic = "force-static";
export default function HomePage() {
  const posts = getPostMeta();

  return (
    <div className="max-w-2xl w-full space-y-4">
      <h1 className="p-4 mt-3 mb-10 text-center text-4xl font-extrabold">
        My Posts
      </h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
