// lib/static-params.ts
import { getPostMeta } from "./posts";

export async function generateCategoryParams() {
  const posts = getPostMeta();

  const seen = new Set<string>();
  const params = posts
    .map((post) => ({
      section: encodeURIComponent(post.section),
      category: encodeURIComponent(post.category),
    }))
    .filter((param) => {
      const key = `${param.section}/${param.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return params;
}
