import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { locales, type Locale } from "../../i18n";
import { Navigation } from "./components/Navigation";
import { getPageSEO } from "./lib/seo";
import { StructuredDataServer } from "./components/StructuredDataServer";
import { BookmarkButton } from "./components/BookmarkButton";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
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

  // locale에 따라 다른 OG 이미지 설정 (default: 영문)
  const ogImage = locale === "ko" 
    ? "https://calc.zucca100.com/og-image-ko.png"
    : "https://calc.zucca100.com/og-image.png";

  const seoConfig = {
    title: t("common.appName"),
    description: t("home.subtitle"),
    keywords: [
      t("home.calculators.bmi.title"),
      t("home.calculators.age.title"),
      t("home.calculators.currency.title"),
      t("home.calculators.unit.title"),
      "calculator",
      "tools",
      "zucca100",
    ],
    canonical: `https://calc.zucca100.com/${locale}`,
    url: `https://calc.zucca100.com/${locale}`,
    ogImage: ogImage,
    alternates: {
      languages: {
        ko: "https://calc.zucca100.com/ko",
        en: "https://calc.zucca100.com/en",
        "x-default": "https://calc.zucca100.com/ko",
      },
    },
  };

  const metadata = generateSEOMetadata(seoConfig);

  // icons와 locale을 추가로 설정
  return {
    ...metadata,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
    openGraph: {
      ...metadata.openGraph,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "zucca100 계산기",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta
          name="naver-site-verification"
          content="60463ab553609557e2fe5463c5c07369f396e329"
        />
        {/* Structured Data - WebSite */}
        <StructuredDataServer type="WebSite" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale as Locale} />
          {children}
          <BookmarkButton />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
