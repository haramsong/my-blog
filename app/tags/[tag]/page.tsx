import InfinitePostList from "@/components/InfinitePostList";
import { getPostsByTag } from "@/lib/posts";
import { generateTagPageParams } from "@/lib/generateStaticParams";
import { removeKebab } from "@/lib/stringUtils";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export const dynamic = "force-static";
export function generateStaticParams() {
  return generateTagPageParams();
}

export type Params = Promise<TagPageProps["params"]>;

export default async function TagPage(props: { params: Params }) {
  const { tag } = await props.params;
  const posts = getPostsByTag(tag);

  return (
    <div className="space-y-2">
      <h1 className="p-4 text-2xl font-bold">#{removeKebab(tag)}</h1>
      <InfinitePostList allPosts={posts} />
    </div>
  );
}
