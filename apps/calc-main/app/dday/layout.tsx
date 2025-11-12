import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "D-Day 계산기",
  "목표 날짜까지 남은 일수를 계산하세요. 기념일, 시험일, 프로젝트 마감일까지의 D-Day를 쉽게 확인할 수 있습니다.",
  "/dday"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function DDayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

