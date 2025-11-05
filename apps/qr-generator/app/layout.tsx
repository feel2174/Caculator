import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "QR 코드 생성기",
  description:
    "텍스트나 URL을 QR 코드로 변환하세요. 무료로 QR 코드를 생성하고 다운로드할 수 있습니다.",
  keywords: [
    "QR 코드 생성기",
    "QR 코드",
    "QR 생성",
    "QR 코드 만들기",
    "QR 코드 변환",
  ],
  canonical: "https://qr.yourdomain.com",
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

