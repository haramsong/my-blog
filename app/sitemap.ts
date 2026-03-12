import { MetadataRoute } from "next";
import { getTagsWithCount, getGNBTree, getPostMeta } from "@/lib/posts";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://blog.hrsong.com";

const toKSTISOString = (dateInput: string | Date) => {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateInput}`);
  }

  return new Date(date.getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .replace("Z", "+09:00");
};

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryMeta = getGNBTree();
  const postMeta = getPostMeta();
  const tags = getTagsWithCount();

  const sitemapDefault: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/profile/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const sitemapFromPosts: MetadataRoute.Sitemap = postMeta.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug.join("/")}/`,
    lastModified: toKSTISOString(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const sitemapFromCategories: MetadataRoute.Sitemap = Object.keys(
    categoryMeta,
  ).flatMap((section) =>
    Object.keys(categoryMeta[section]).map((category) => ({
      url: `${BASE_URL}/posts/${section}/${category}/`,
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  );

  const sitemapFromTags: MetadataRoute.Sitemap = Object.keys(tags).map(
    (tag) => ({
      url: `${BASE_URL}/tags/${tag}/`,
      changeFrequency: "weekly",
      priority: 0.4,
    }),
  );

  return [
    ...sitemapDefault,
    ...sitemapFromPosts,
    ...sitemapFromCategories,
    ...sitemapFromTags,
  ];
}
