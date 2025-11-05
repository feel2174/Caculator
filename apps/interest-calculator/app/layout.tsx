import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "이자 계산기",
  description:
    "예금, 적금, 대출의 이자를 계산하세요. 원금, 이자율, 기간을 입력하면 복리와 단리를 모두 계산할 수 있습니다.",
  keywords: [
    "이자 계산기",
    "복리 계산",
    "단리 계산",
    "예금 이자",
    "적금 이자",
    "대출 이자",
  ],
  canonical: "https://interest.yourdomain.com",
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

