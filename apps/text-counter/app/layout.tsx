import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "텍스트 카운터",
  description:
    "텍스트의 글자 수, 단어 수, 줄 수를 실시간으로 계산하세요. SNS 게시물, 이메일, 문서 작성에 유용합니다.",
  keywords: [
    "텍스트 카운터",
    "글자 수",
    "단어 수",
    "문자 수",
    "텍스트 길이",
    "글자 수 세기",
  ],
  canonical: "https://text.yourdomain.com",
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

