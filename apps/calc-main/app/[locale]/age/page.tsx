"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { validateDate } from "@cal/utils";
import { DatePicker } from "../components/DatePicker";

export default function AgeCalculator() {
  const t = useTranslations("age");
  const params = useParams();
  const locale = params.locale as string;
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [result, setResult] = useState<{
    koreanAge: number;
    internationalAge: number;
    days: number;
    months: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = () => {
    setError(null);
    if (!birthDate) {
      setError(t("errors.birthDateRequired"));
      return;
    }

    const validation = validateDate(birthDate, t("birthDate"));
    if (!validation.valid) {
      setError(validation.error || t("errors.invalidDate"));
      setResult(null);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birth = new Date(birthDate);
    birth.setHours(0, 0, 0, 0);

    // 한국 나이 (생일과 관계없이 +1)
    const koreanAge = today.getFullYear() - birth.getFullYear() + 1;

    // 만나이 (국제 표준)
    let internationalAge = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      internationalAge--;
    }

    // 총 일수 계산
    const diffTime = today.getTime() - birth.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 개월 수 계산
    let months = (today.getFullYear() - birth.getFullYear()) * 12;
    months += today.getMonth() - birth.getMonth();
    if (today.getDate() < birth.getDate()) {
      months--;
    }

    setResult({
      koreanAge,
      internationalAge,
      days: diffDays,
      months,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("title")}</h1>
          <p className="text-gray-600">
            {t("subtitle")}
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>{t("cardTitle")}</CardTitle>
            <CardDescription>
              {t("cardDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>{t("birthDate")}</Label>
              <DatePicker
                date={birthDate}
                onSelect={(date) => {
                  setBirthDate(date);
                  setError(null);
                }}
                placeholder={t("placeholders.birthDate")}
                maxDate={new Date()}
                locale={locale as "ko" | "en"}
                className="text-lg"
              />
            </div>

            <Button
              onClick={calculateAge}
              className="w-full text-lg py-6"
              size="lg"
            >
              {t("calculate")}
            </Button>

            {result && (
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t("result.koreanAge")}</p>
                      <p className="text-4xl font-bold text-purple-600">
                        {result.koreanAge}{locale === "ko" ? "세" : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t("result.internationalAge")}</p>
                      <p className="text-4xl font-bold text-pink-600">
                        {result.internationalAge}{locale === "ko" ? "세" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("result.days")}</p>
                      <p className="text-2xl font-semibold text-gray-800">
                        {result.days.toLocaleString()}{locale === "ko" ? "일" : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t("result.months")}</p>
                      <p className="text-2xl font-semibold text-gray-800">
                        {result.months}{locale === "ko" ? "개월" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{t("info.title")}</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>{t("info.koreanAge")}</li>
                <li>{t("info.internationalAge")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

