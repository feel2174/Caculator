import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "단위 변환기",
  "길이, 무게, 온도, 부피 등 다양한 단위를 쉽게 변환하세요. 일상생활에서 자주 사용하는 단위 변환을 빠르고 정확하게 계산할 수 있습니다.",
  "/unit"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

