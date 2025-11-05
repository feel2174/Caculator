import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "대출 계산기",
  description:
    "대출 상환금을 계산하세요. 대출 금액, 이자율, 상환 기간을 입력하면 월 상환금과 총 이자를 계산할 수 있습니다.",
  keywords: [
    "대출 계산기",
    "대출 상환금",
    "월 상환금",
    "대출 이자",
    "원리금균등분할",
    "원금균등분할",
  ],
  canonical: "https://loan.yourdomain.com",
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

