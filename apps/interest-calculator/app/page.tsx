"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { Select } from "@cal/ui";
import { formatNumber, formatCurrency } from "@cal/utils";
import { validatePositive, validateInterestRate, validatePeriod } from "@cal/utils";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [type, setType] = useState<"simple" | "compound">("compound");
  const [result, setResult] = useState<{
    total: number;
    interest: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const principalNum = parseFloat(principal);
    const rateNum = parseFloat(rate);
    const periodNum = parseFloat(period);

    const principalValidation = validatePositive(principalNum, "원금");
    if (!principalValidation.valid) {
      setError(principalValidation.error || "원금을 확인해주세요.");
      setResult(null);
      return;
    }

    const rateValidation = validateInterestRate(rateNum);
    if (!rateValidation.valid) {
      setError(rateValidation.error || "이자율을 확인해주세요.");
      setResult(null);
      return;
    }

    const periodValidation = validatePeriod(periodNum);
    if (!periodValidation.valid) {
      setError(periodValidation.error || "기간을 확인해주세요.");
      setResult(null);
      return;
    }

    const rateDecimal = rateNum / 100;
    let total = 0;
    let interest = 0;

    if (type === "simple") {
      interest = principalNum * rateDecimal * periodNum;
      total = principalNum + interest;
    } else {
      total = principalNum * Math.pow(1 + rateDecimal, periodNum);
      interest = total - principalNum;
    }

    setResult({ total, interest });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">이자 계산기</h1>
          <p className="text-gray-600">
            예금, 적금, 대출의 이자를 계산하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>이자 계산</CardTitle>
            <CardDescription>
              원금, 이자율, 기간을 입력하여 이자를 계산하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>이자 계산 방식</Label>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as typeof type)}
                options={[
                  { value: "compound", label: "복리" },
                  { value: "simple", label: "단리" },
                ]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="principal">원금 (원)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="예: 1000000"
                value={principal}
                onChange={(e) => {
                  setPrincipal(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="1"
                step="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">이자율 (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="예: 3.5"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">기간 (년)</Label>
              <Input
                id="period"
                type="number"
                placeholder="예: 1"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="0.1"
                max="100"
                step="0.1"
              />
            </div>

            <Button onClick={calculate} className="w-full text-lg py-6" size="lg">
              계산하기
            </Button>

            {result && (
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">총 금액</p>
                      <p className="text-4xl font-bold text-indigo-600">
                        {formatCurrency(result.total)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">이자</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {formatCurrency(result.interest)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">계산 공식</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 단리: 이자 = 원금 × 이자율 × 기간</li>
                <li>• 복리: 총액 = 원금 × (1 + 이자율)^기간</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
