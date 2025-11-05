import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "단위 변환기",
  description:
    "길이, 무게, 온도, 부피 등 다양한 단위를 쉽게 변환하세요. 일상생활에서 자주 사용하는 단위 변환을 빠르고 정확하게 계산할 수 있습니다.",
  keywords: [
    "단위 변환기",
    "길이 변환",
    "무게 변환",
    "온도 변환",
    "부피 변환",
    "단위 계산",
  ],
  canonical: "https://unit.yourdomain.com",
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

