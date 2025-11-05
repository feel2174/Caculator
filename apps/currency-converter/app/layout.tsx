import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "환율 계산기",
  description:
    "다양한 통화 간 환율을 계산하세요. USD, EUR, JPY, CNY 등 주요 통화의 환율을 확인하고 변환할 수 있습니다.",
  keywords: [
    "환율 계산기",
    "환율 변환",
    "통화 변환",
    "USD 환율",
    "EUR 환율",
    "환율 계산",
  ],
  canonical: "https://currency.yourdomain.com",
};

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

