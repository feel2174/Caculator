import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "이자 계산기",
  "예금, 적금, 대출의 이자를 계산하세요. 원금, 이자율, 기간을 입력하면 복리와 단리를 모두 계산할 수 있습니다.",
  "/interest"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function InterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

