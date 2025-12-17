import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../lib/seo";
import { getMessages } from "next-intl/server";
import { StructuredDataServer } from "../components/StructuredDataServer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoConfig = await getPageSEO(
    locale,
    "dday.title",
    "dday.subtitle",
    "/dday"
  );

  return generateSEOMetadata(seoConfig);
}

export default async function DDayLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === "string" ? value : key;
  };

  const baseUrl = "https://calc.zucca100.com";
  const pathname = `/${locale}/dday`;

  // FAQ 구조화된 데이터 생성
  const faqQuestions = [
    {
      "@type": "Question",
      name: t("dday.seo.faq1.question"),
      acceptedAnswer: {
        "@type": "Answer",
        text: t("dday.seo.faq1.answer"),
      },
    },
    {
      "@type": "Question",
      name: t("dday.seo.faq2.question"),
      acceptedAnswer: {
        "@type": "Answer",
        text: t("dday.seo.faq2.answer"),
      },
    },
    {
      "@type": "Question",
      name: t("dday.seo.faq3.question"),
      acceptedAnswer: {
        "@type": "Answer",
        text: t("dday.seo.faq3.answer"),
      },
    },
  ];

  // SoftwareApplication 구조화된 데이터
  const appData = {
    name: t("dday.title"),
    description: t("dday.subtitle"),
    rating: {
      value: "4.7",
      count: "1500",
    },
  };

  // Breadcrumb 구조화된 데이터
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "ko" ? "홈" : "Home",
      item: `${baseUrl}/${locale}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: t("dday.title"),
      item: `${baseUrl}${pathname}`,
    },
  ];

  return (
    <>
      {/* WebPage 구조화된 데이터 */}
      <StructuredDataServer
        type="WebPage"
        pathname={pathname}
        data={{
          name: t("dday.title"),
          description: t("dday.subtitle"),
          locale: locale,
          breadcrumb: breadcrumbItems,
        }}
      />

      {/* FAQPage 구조화된 데이터 */}
      <StructuredDataServer type="FAQPage" data={{ questions: faqQuestions }} />

      {/* SoftwareApplication 구조화된 데이터 */}
      <StructuredDataServer
        type="SoftwareApplication"
        pathname={pathname}
        data={appData}
      />

      {/* BreadcrumbList 구조화된 데이터 */}
      <StructuredDataServer type="BreadcrumbList" data={{ items: breadcrumbItems }} />

      {children}
    </>
  );
}

