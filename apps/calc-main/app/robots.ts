import { MetadataRoute } from "next";

const baseUrl = "https://calc.zucca100.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 모든 크롤러에 대한 기본 규칙
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // API 엔드포인트 차단
          "/_next/", // Next.js 내부 파일 차단 (빌드 산출물, 정적 파일 등)
          "/_vercel/", // Vercel 내부 파일 차단
          "/admin/", // 관리자 페이지 차단 (향후 사용 가능)
        ],
      },
      {
        // Googlebot에 대한 특별 규칙
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/_vercel/",
          "/admin/",
        ],
      },
      {
        // Bingbot에 대한 특별 규칙
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/_vercel/",
          "/admin/",
        ],
      },
      {
        // Naverbot (네이버 검색 봇)
        userAgent: "Yeti",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/_vercel/",
          "/admin/",
        ],
      },
      {
        // Facebook 크롤러
        userAgent: "FacebookExternalHit",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Twitter 크롤러
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // LinkedIn 크롤러
        userAgent: "LinkedInBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // WhatsApp 크롤러
        userAgent: "WhatsApp",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Apple 크롤러
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

