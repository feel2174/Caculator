import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "만나이 계산기",
  "생년월일을 입력하면 정확한 만나이를 계산해드립니다. 한국 나이와 만나이를 함께 확인할 수 있습니다.",
  "/age"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function AgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

