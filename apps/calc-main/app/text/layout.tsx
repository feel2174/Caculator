import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "텍스트 카운터",
  "텍스트의 글자 수, 단어 수, 줄 수를 실시간으로 계산하세요. SNS 게시물, 이메일, 문서 작성에 유용합니다.",
  "/text"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function TextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

