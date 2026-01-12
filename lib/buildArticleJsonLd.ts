interface BuildArticleJsonLdParams {
  title: string;
  summary: string;
  thumbnail: string;
  slug: string;
  date: string;
  tags: string[];
}

export const buildArticleJsonLd = ({
  title,
  summary,
  thumbnail,
  slug,
  date,
  tags,
}: BuildArticleJsonLdParams) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary,
    image: `${baseUrl}${thumbnail}`,
    author: {
      "@type": "Person",
      name: "송하람",
      url: `${baseUrl}/profile/`,
    },
    publisher: {
      "@type": "Organization",
      name: "Haram's TECH BLOG",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/posts/${slug}/`,
    },
    keywords: tags.join(", "),
  };
};
