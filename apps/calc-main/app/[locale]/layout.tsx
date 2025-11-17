import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { locales, type Locale } from "../../i18n";
import { Navigation } from "./components/Navigation";
import { getPageSEO } from "./lib/seo";

const inter = Inter({ subsets: ["latin"] });

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
    alternates: {
      languages: {
        ko: "https://calc.zucca100.com/ko",
        en: "https://calc.zucca100.com/en",
        "x-default": "https://calc.zucca100.com/ko",
      },
    },
  };

  return generateSEOMetadata(seoConfig);
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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale as Locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

