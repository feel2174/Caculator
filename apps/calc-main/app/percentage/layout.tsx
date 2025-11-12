import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "퍼센트 계산기",
  "퍼센트 계산을 쉽고 빠르게 할 수 있습니다. 할인율, 증가율, 비율 계산 등 다양한 퍼센트 계산을 지원합니다.",
  "/percentage"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function PercentageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

