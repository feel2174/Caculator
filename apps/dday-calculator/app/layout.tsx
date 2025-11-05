import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "D-Day 계산기",
  description:
    "목표 날짜까지 남은 일수를 계산하세요. 기념일, 시험일, 프로젝트 마감일까지의 D-Day를 쉽게 확인할 수 있습니다.",
  keywords: [
    "D-Day 계산기",
    "디데이 계산기",
    "날짜 계산",
    "기념일 계산",
    "남은 일수",
    "카운트다운",
  ],
  canonical: "https://dday.yourdomain.com",
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

