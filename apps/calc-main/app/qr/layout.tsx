import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../layout";

const seoConfig = getPageSEO(
  "QR 코드 생성기",
  "텍스트나 URL을 QR 코드로 변환하세요. 무료로 QR 코드를 생성하고 다운로드할 수 있습니다.",
  "/qr"
);

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function QRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

