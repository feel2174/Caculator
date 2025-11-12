import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "비밀번호 생성기",
  "강력하고 안전한 비밀번호를 생성하세요. 길이와 옵션을 선택하여 원하는 비밀번호를 만들 수 있습니다.",
  "/password"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function PasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

