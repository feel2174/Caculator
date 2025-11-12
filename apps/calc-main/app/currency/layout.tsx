import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "환율 계산기",
  "다양한 통화 간 환율을 계산하세요. USD, EUR, JPY, CNY 등 주요 통화의 환율을 확인하고 변환할 수 있습니다.",
  "/currency"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function CurrencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

