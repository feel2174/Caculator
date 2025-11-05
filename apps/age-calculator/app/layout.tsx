import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "만나이 계산기",
  description:
    "생년월일을 입력하면 정확한 만나이를 계산해드립니다. 한국 나이와 만나이를 함께 확인할 수 있습니다.",
  keywords: [
    "만나이 계산기",
    "나이 계산",
    "생년월일 계산",
    "만나이",
    "한국나이",
    "나이 변환",
  ],
  canonical: "https://age.yourdomain.com",
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

