import { MetadataRoute } from "next";
import { locales } from "../i18n";

const baseUrl = "https://calc.zucca100.com";

const calculatorPaths = [
  "bmi",
  "age",
  "dday",
  "percentage",
  "unit",
  "interest",
  "loan",
  "color",
  "qr",
  "password",
  "text",
  "currency",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    });
  });

  // Calculator pages for each locale
  calculatorPaths.forEach((path) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}/${path}`])
          ),
        },
      });
    });
  });

  return routes;
}

