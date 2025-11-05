import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "색상 코드 변환기",
  description:
    "HEX, RGB, HSL 색상 코드를 쉽게 변환하세요. 색상 코드를 입력하면 다양한 형식으로 변환하고 색상을 미리 볼 수 있습니다.",
  keywords: [
    "색상 코드 변환기",
    "HEX 변환",
    "RGB 변환",
    "HSL 변환",
    "색상 코드",
    "컬러 변환",
  ],
  canonical: "https://color.yourdomain.com",
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

