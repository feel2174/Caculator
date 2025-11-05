import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

const inter = Inter({ subsets: ["latin"] });

const seoConfig = {
  title: "BMI 계산기",
  description:
    "체질량지수(BMI)를 빠르고 정확하게 계산하세요. 키와 몸무게만 입력하면 즉시 BMI 수치와 건강 상태를 확인할 수 있습니다.",
  keywords: [
    "BMI 계산기",
    "체질량지수",
    "BMI",
    "건강 계산기",
    "비만도 계산",
    "체중 관리",
  ],
  canonical: "https://bmi.yourdomain.com",
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

