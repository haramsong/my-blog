import InfinitePostList from "@/components/InfinitePostList";
import { getPostMeta } from "@/lib/posts";

export default function HomePage() {
  const posts = getPostMeta();

  return <InfinitePostList allPosts={posts} />;
}
