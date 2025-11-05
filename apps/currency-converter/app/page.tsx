"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { formatNumber } from "@cal/utils";

// 예시 환율 (실제로는 API에서 가져와야 함)
const exchangeRates: Record<string, number> = {
  KRW: 1,
  USD: 0.00075,
  EUR: 0.00069,
  JPY: 0.11,
  CNY: 0.0054,
  GBP: 0.00059,
};

const currencies = Object.keys(exchangeRates);

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("KRW");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return;

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    // KRW로 변환 후 목표 통화로 변환
    const krwAmount = amountNum / fromRate;
    const converted = krwAmount * toRate;

    setResult(converted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">환율 계산기</h1>
          <p className="text-gray-600">
            다양한 통화 간 환율을 계산하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>환율 변환</CardTitle>
            <CardDescription>
              금액과 통화를 선택하여 환율을 계산하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>변환 전</Label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background mb-2"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  placeholder="금액 입력"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyUp={convert}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>변환 후</Label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background mb-2"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-lg items-center">
                  {result !== null
                    ? `${formatNumber(result, { decimals: 2 })} ${toCurrency}`
                    : "-"}
                </div>
              </div>
            </div>

            {result !== null && (
              <div className="mt-4 p-4 bg-sky-50 rounded-lg border border-sky-200">
                <p className="text-center text-gray-700">
                  {amount} {fromCurrency} = {formatNumber(result, { decimals: 2 })}{" "}
                  {toCurrency}
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">참고사항</h3>
              <p className="text-sm text-gray-600">
                환율은 예시 값이며, 실제 환율과 다를 수 있습니다. 정확한 환율은
                금융기관에서 확인하세요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

