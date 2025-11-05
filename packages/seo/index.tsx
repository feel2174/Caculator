import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage,
    canonical,
    noindex = false,
  } = config;

  const fullTitle = `${title} | 계산기 도구`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
  };
}

