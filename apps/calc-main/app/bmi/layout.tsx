import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "BMI 계산기",
  "체질량지수(BMI)를 빠르고 정확하게 계산하세요. 키와 몸무게만 입력하면 즉시 BMI 수치와 건강 상태를 확인할 수 있습니다.",
  "/bmi"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function BMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

