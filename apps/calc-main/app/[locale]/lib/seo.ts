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

  // 추가 키워드가 있는 경우 사용
  const additionalKeywords = t(`${titleKey.split(".")[0]}.seoKeywords`);
  const baseKeywords = [
    t(titleKey),
    "calculator",
    "zucca100",
    ...t(descriptionKey).split(" ").slice(0, 5),
  ];

  const keywords = typeof additionalKeywords === "string" && additionalKeywords !== `${titleKey.split(".")[0]}.seoKeywords`
    ? [...baseKeywords, ...additionalKeywords.split(",").map(k => k.trim())]
    : baseKeywords;

  const baseTitle = t(titleKey);
  
  // seoDescription이 있으면 우선 사용, 없으면 기본 descriptionKey 사용
  const pageKey = titleKey.split(".")[0];
  const seoDescriptionKey = `${pageKey}.seoDescription`;
  const seoDescription = t(seoDescriptionKey);
  const defaultDescription = t(descriptionKey);
  
  // seoDescription이 실제로 존재하는지 확인 (키가 아닌 값인지)
  const description = seoDescription !== seoDescriptionKey 
    ? seoDescription 
    : defaultDescription;
  
  // 제목이 너무 짧은 경우 설명과 브랜드명을 추가하여 SEO 최적화
  const fullTitle = baseTitle.length < 30 
    ? `${baseTitle} - ${defaultDescription} | zucca100`
    : `${baseTitle} | zucca100`;

  // locale에 따라 다른 OG 이미지 설정 (default: 영문)
  const ogImage = locale === "ko" 
    ? "https://calc.zucca100.com/og-image-ko.png"
    : "https://calc.zucca100.com/og-image.png";

  return {
    title: fullTitle,
    description: description,
    keywords,
    canonical: `https://calc.zucca100.com/${locale}${path}`,
    url: `https://calc.zucca100.com/${locale}${path}`,
    ogImage: ogImage,
    alternates: {
      languages: {
        ko: `https://calc.zucca100.com/ko${path}`,
        en: `https://calc.zucca100.com/en${path}`,
        "x-default": `https://calc.zucca100.com/ko${path}`,
      },
    },
  };
}

