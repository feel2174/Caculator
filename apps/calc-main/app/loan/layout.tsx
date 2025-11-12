import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "대출 계산기",
  "대출 상환금을 계산하세요. 대출 금액, 이자율, 상환 기간을 입력하면 월별 상환 금액과 총 이자를 계산할 수 있습니다.",
  "/loan"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function LoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

