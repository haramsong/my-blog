import { MetadataRoute } from "next";
import { getTagsWithCount, getGNBTree, getPostMeta } from "@/lib/posts";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const categoryMeta = getGNBTree();
  const postMeta = getPostMeta();
  const tags = getTagsWithCount();

  const sitemapDefault: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const sitemapFromPosts: MetadataRoute.Sitemap = postMeta.map((post) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.slug.join("/")}`,
      lastModified: new Date(post.date),
      changeFrequency: "daily",
      priority: 0.8,
    };
  });

  const sitemapFromCategories: MetadataRoute.Sitemap = Object.keys(
    categoryMeta
  ).flatMap((section) => {
    return Object.keys(categoryMeta[section]).map((category) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${section}/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      };
    });
  });

  const sitemapFromTags: MetadataRoute.Sitemap = Object.keys(tags).map(
    (tag) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${tag}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      };
    }
  );

  return [
    ...sitemapDefault,
    ...sitemapFromPosts,
    ...sitemapFromCategories,
    ...sitemapFromTags,
  ];
}
