import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "계산기 도구 모음",
  description:
    "다양한 계산기와 유틸리티 도구를 한 곳에서 사용하세요. BMI, 나이, D-Day, 환율, 단위 변환 등 일상생활에 필요한 모든 계산기를 제공합니다.",
  keywords: [
    "계산기",
    "BMI 계산기",
    "나이 계산기",
    "환율 계산기",
    "단위 변환기",
    "유틸리티",
    "도구",
  ],
  canonical: "https://calc.zucca100.com",
};

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <Link href="/" className="text-xl font-bold text-primary hover:opacity-80">
              계산기 도구 모음
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

