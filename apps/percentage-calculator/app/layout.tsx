import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "퍼센트 계산기",
  description:
    "퍼센트 계산을 쉽고 빠르게 할 수 있습니다. 할인율, 증가율, 비율 계산 등 다양한 퍼센트 계산을 지원합니다.",
  keywords: [
    "퍼센트 계산기",
    "퍼센트",
    "할인율 계산",
    "증가율 계산",
    "비율 계산",
    "백분율",
  ],
  canonical: "https://percentage.yourdomain.com",
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

