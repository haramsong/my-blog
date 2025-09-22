import HydrateHeader from "@/components/HydrateHeader";
import InfinitePostList from "@/components/InfinitePostList";
import { getPostMeta } from "@/lib/posts";

export const dynamic = "force-static";
export default function HomePage() {
  const posts = getPostMeta();

  return (
    <section
      aria-labelledby="post-list-heading"
      className="max-w-3xl w-full space-y-4"
    >
      <HydrateHeader title="전체 글" />
      <h1
        id="post-list-heading"
        className="p-4 mt-3 mb-10 text-center text-4xl font-bold"
      >
        전체 글
      </h1>
      <InfinitePostList allPosts={posts} />
    </section>
  );
}
