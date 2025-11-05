import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "비밀번호 생성기",
  description:
    "강력하고 안전한 비밀번호를 생성하세요. 길이와 옵션을 선택하여 원하는 비밀번호를 만들 수 있습니다.",
  keywords: [
    "비밀번호 생성기",
    "패스워드 생성",
    "랜덤 비밀번호",
    "안전한 비밀번호",
    "비밀번호 만들기",
  ],
  canonical: "https://password.yourdomain.com",
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

