import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";
import { getPageSEO } from "../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoConfig = await getPageSEO(
    locale,
    "salary.title",
    "salary.seoDescription",
    "/salary"
  );

  return generateSEOMetadata(seoConfig);
}

export default async function SalaryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params;
  return children;
}


