import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  alternates?: {
    languages?: Record<string, string>;
  };
  noindex?: boolean;
  url?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage,
    canonical,
    alternates,
    noindex = false,
    url,
  } = config;

  const fullTitle = `${title} | 계산기 도구`;
  const siteUrl = url || canonical || "https://calc.zucca100.com";

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: url || canonical || siteUrl,
      siteName: "계산기 도구",
      locale: "ko_KR",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      ...(canonical && { canonical }),
      ...(alternates?.languages && { languages: alternates.languages }),
    },
    metadataBase: new URL(siteUrl),
  };
}

