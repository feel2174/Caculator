import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "색상 코드 변환기",
  "HEX, RGB, HSL 색상 코드를 쉽게 변환하세요. 색상 코드를 입력하면 다양한 형식으로 변환하고 색상을 미리 볼 수 있습니다.",
  "/color"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function ColorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

