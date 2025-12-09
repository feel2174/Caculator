"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Label } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { validateDate } from "@cal/utils";
import { DatePicker } from "../components/DatePicker";

export default function DDayCalculator() {
  const t = useTranslations("dday");
  const locale = useLocale();
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);
  const [dday, setDday] = useState<number | null>(null);
  const [isPast, setIsPast] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateDDay = () => {
    setError(null);
    if (!targetDate) {
      setDday(null);
      return;
    }

    const validation = validateDate(targetDate, t("targetDate"));
    if (!validation.valid) {
      setError(validation.error || t("errors.invalidDate"));
      setDday(null);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDday(diffDays);
    setIsPast(diffDays < 0);
  };

  useEffect(() => {
    if (targetDate) {
      calculateDDay();
    } else {
      setDday(null);
      setError(null);
    }
  }, [targetDate]);

  const getDDayText = () => {
    if (dday === null) return "";
    if (dday === 0) return "D-Day";
    if (isPast) return `D+${Math.abs(dday)}`;
    return `D-${dday}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>{t("cardTitle")}</CardTitle>
            <CardDescription>{t("cardDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>{t("targetDate")}</Label>
              <DatePicker
                date={targetDate}
                onSelect={(date) => {
                  setTargetDate(date);
                  setError(null);
                }}
                placeholder={t("placeholders.targetDate")}
                locale={locale as "ko" | "en"}
                className="text-lg"
              />
            </div>

            {dday !== null && (
              <div className="mt-8 p-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{t("result.dday")}</p>
                    <p
                      className={`text-6xl font-bold ${
                        isPast ? "text-red-600" : "text-orange-600"
                      }`}
                    >
                      {getDDayText()}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-700">
                      {isPast
                        ? t("result.daysPast", { days: Math.abs(dday) })
                        : t("result.daysLeft", { days: dday })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{t("info.title")}</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>{t("info.d0")}</li>
                <li>{t("info.d1")}</li>
                <li>{t("info.d1Past")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

