import { getPostMeta, getAllSlugArrays, getTagsWithCount } from "./posts";

export async function generateCategoryPageParams() {
  const posts = getPostMeta();

  const seen = new Set<string>();
  const params = posts
    .map((post) => ({
      section: post.section,
      category: post.category,
    }))
    .filter((param) => {
      const key = `${param.section}/${param.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return params;
}

export async function generatePostPageParams() {
  const slugs = getAllSlugArrays();

  return slugs.map(([section, category, slug]) => ({
    section,
    category,
    slug,
  }));
}

export function generateTagPageParams() {
  const tagCounts = Object.entries(getTagsWithCount());
  return tagCounts.map(([tag]) => ({ tag }));
}
