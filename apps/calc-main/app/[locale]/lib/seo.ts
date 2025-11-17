import { getMessages } from "next-intl/server";
import { generateMetadata as generateSEOMetadata } from "@cal/seo";

// 각 페이지별 SEO 설정을 위한 헬퍼 함수
export async function getPageSEO(
  locale: string,
  titleKey: string,
  descriptionKey: string,
  path: string
) {
  const messages = await getMessages({ locale });
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === "string" ? value : key;
  };

  return {
    title: t(titleKey),
    description: t(descriptionKey),
    keywords: [
      t(titleKey),
      "calculator",
      "zucca100",
      ...t(descriptionKey).split(" ").slice(0, 5),
    ],
    canonical: `https://calc.zucca100.com/${locale}${path}`,
    url: `https://calc.zucca100.com/${locale}${path}`,
    alternates: {
      languages: {
        ko: `https://calc.zucca100.com/ko${path}`,
        en: `https://calc.zucca100.com/en${path}`,
        "x-default": `https://calc.zucca100.com/ko${path}`,
      },
    },
  };
}

