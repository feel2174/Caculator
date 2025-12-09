"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Select } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { Skeleton } from "@cal/ui";
import { Button } from "@cal/ui";
import { formatNumber } from "@cal/utils";
import { validatePositive } from "@cal/utils";
import { cn } from "@cal/ui";

export default function CurrencyConverter() {
  const t = useTranslations("currency");
  
  // 지원 통화 목록
  const currencies = [
    { value: "KRW", label: "한국 원 (KRW)" },
    { value: "USD", label: "미국 달러 (USD)" },
    { value: "EUR", label: "유로 (EUR)" },
    { value: "JPY", label: "일본 엔 (JPY)" },
    { value: "CNY", label: "중국 위안 (CNY)" },
    { value: "GBP", label: "영국 파운드 (GBP)" },
    { value: "AUD", label: "호주 달러 (AUD)" },
    { value: "CAD", label: "캐나다 달러 (CAD)" },
    { value: "CHF", label: "스위스 프랑 (CHF)" },
    { value: "HKD", label: "홍콩 달러 (HKD)" },
    { value: "SGD", label: "싱가포르 달러 (SGD)" },
  ];

  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("KRW");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [result, setResult] = useState<number | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadExchangeRates();
  }, []);

  useEffect(() => {
    if (amount && rates[fromCurrency] && rates[toCurrency]) {
      convert();
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const loadExchangeRates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/rates?base=KRW");
      const data = await response.json();

      if (data.success) {
        setRates(data.rates);
        setLastUpdated(new Date(data.timestamp));
      } else {
        throw new Error(data.error || "Failed to load rates");
      }
    } catch (err) {
      console.error("Error loading exchange rates:", err);
      setError("환율 정보를 불러올 수 없습니다. 기본 환율을 사용합니다.");
      // 폴백 데이터 사용
      setRates({
        KRW: 1,
        USD: 0.00075,
        EUR: 0.00069,
        JPY: 0.11,
        CNY: 0.0054,
        GBP: 0.00059,
        AUD: 0.0011,
        CAD: 0.0010,
        CHF: 0.00068,
        HKD: 0.0059,
        SGD: 0.0010,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convert = () => {
    setError(null);
    const amountNum = parseFloat(amount);

    if (!amount) {
      setResult(null);
      return;
    }

    const validation = validatePositive(amountNum, "금액");
    if (!validation.valid) {
      setError(validation.error || "올바른 금액을 입력해주세요.");
      setResult(null);
      return;
    }

    if (!rates[fromCurrency] || !rates[toCurrency]) {
      setError("환율 정보가 없습니다.");
      setResult(null);
      return;
    }

    // KRW를 기준으로 변환
    const krwAmount = amountNum / rates[fromCurrency];
    const converted = krwAmount * rates[toCurrency];
    setResult(converted);
  };

  const swapCurrencies = () => {
    // 화폐 스왑
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    
    // 금액도 스왑 (결과값이 있을 때만)
    if (result !== null) {
      // 결과값을 새로운 입력값으로 설정
      const newAmount = result.toFixed(2);
      setAmount(newAmount);
      // result는 useEffect가 자동으로 재계산할 것임
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
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
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <>
                {error && (
                  <Alert variant="warning">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {lastUpdated && (
                  <div className="text-xs text-gray-500 text-center">
                    {t("lastUpdated")}: {lastUpdated.toLocaleString("ko-KR")}
                  </div>
                )}

                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t("from")}</Label>
                      <Select
                        value={fromCurrency}
                        onChange={(e) => {
                          setFromCurrency(e.target.value);
                          setResult(null);
                        }}
                        options={currencies}
                      />
                      <Input
                        type="number"
                        placeholder={t("placeholders.amount")}
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setError(null);
                        }}
                        className="text-lg"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t("to")}</Label>
                      <Select
                        value={toCurrency}
                        onChange={(e) => {
                          setToCurrency(e.target.value);
                          setResult(null);
                        }}
                        options={currencies}
                      />
                      <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-lg items-center">
                        {result !== null
                          ? `${formatNumber(result, { decimals: 2 })} ${toCurrency}`
                          : "-"}
                      </div>
                    </div>
                  </div>

                  {/* 스왑 버튼 */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={swapCurrencies}
                      className={cn(
                        "h-10 w-10 rounded-full border-2 bg-white shadow-md",
                        "hover:bg-gray-50 hover:scale-110 active:scale-95",
                        "transition-all duration-200",
                        "border-sky-300 hover:border-sky-400"
                      )}
                      aria-label={t("swap")}
                      title={t("swap")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-sky-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>

                {result !== null && (
                  <div className="mt-4 p-4 bg-sky-50 rounded-lg border border-sky-200">
                    <p className="text-center text-gray-700">
                      {amount} {currencies.find((c) => c.value === fromCurrency)?.label} ={" "}
                      {formatNumber(result, { decimals: 2 })}{" "}
                      {currencies.find((c) => c.value === toCurrency)?.label}
                    </p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">{t("info.title")}</h3>
                  <p className="text-sm text-gray-600">{t("info.description")}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

