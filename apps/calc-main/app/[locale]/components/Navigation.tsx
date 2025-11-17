"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { type Locale } from "../../../i18n";

export function Navigation({ locale }: { locale: Locale }) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(ko|en)/, "");

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-primary hover:opacity-80"
        >
          {t("appName")}
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/ko${currentPath}`}
            className={`px-3 py-1 rounded text-sm ${
              locale === "ko"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t("korean")}
          </Link>
          <Link
            href={`/en${currentPath}`}
            className={`px-3 py-1 rounded text-sm ${
              locale === "en"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t("english")}
          </Link>
        </div>
      </div>
    </nav>
  );
}

