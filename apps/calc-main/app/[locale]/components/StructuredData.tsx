"use client";

import { usePathname } from "next/navigation";

interface StructuredDataProps {
  type: "WebSite" | "WebPage" | "BreadcrumbList";
  data?: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const pathname = usePathname();
  const baseUrl = "https://calc.zucca100.com";

  const getStructuredData = () => {
    switch (type) {
      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "계산기 도구",
          alternateName: "Calculator Tools",
          url: baseUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "WebPage":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: `${baseUrl}${pathname}`,
          name: data?.name || "계산기 도구",
          description: data?.description || "다양한 계산기 도구를 제공합니다",
          ...(data?.breadcrumb && {
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: data.breadcrumb,
            },
          }),
        };

      case "BreadcrumbList":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data?.items || [],
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

