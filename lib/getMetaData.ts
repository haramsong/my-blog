import { Metadata } from "next";

import { META } from "@/constants/meta";

interface MetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
  keywords?: string[];
}

export const getMetadata = (metadataProps?: MetadataProps) => {
  const { title, description, asPath, ogImage, keywords } = metadataProps || {};

  const normalizePath = (path?: string) =>
    path ? (path.startsWith("/") ? path : `/${path}`) : "";

  const TITLE = title ? `${title} | Haram's TECH BLOG` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? `${META.url}${normalizePath(asPath)}` : META.url;
  const OG_IMAGE = `${META.url}${ogImage || META.ogImage}`;
  const KEYWORDS = Array.from(new Set([...(keywords || []), ...META.keyword]));

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: META.siteName,
      locale: "ko_KR",
      type: "website",
      url: PAGE_URL,
      images: [
        {
          url: OG_IMAGE,
        },
      ],
    },
    verification: {
      other: {
        "naver-site-verification": META.naverVerification || "",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};
