"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { formatNumber } from "@cal/utils";
import { validatePositive, validatePercentage } from "@cal/utils";

export default function PercentageCalculator() {
  const [value, setValue] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const valueNum = parseFloat(value);
    const percentageNum = parseFloat(percentage);

    const valueValidation = validatePositive(valueNum, "값");
    if (!valueValidation.valid) {
      setError(valueValidation.error || "값을 확인해주세요.");
      setResult(null);
      return;
    }

    const percentageValidation = validatePercentage(percentageNum);
    if (!percentageValidation.valid) {
      setError(percentageValidation.error || "퍼센트를 확인해주세요.");
      setResult(null);
      return;
    }

    const calculated = (valueNum * percentageNum) / 100;
    setResult(calculated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">퍼센트 계산기</h1>
          <p className="text-gray-600">
            퍼센트 계산을 쉽고 빠르게 할 수 있습니다
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>퍼센트 계산</CardTitle>
            <CardDescription>
              값과 퍼센트를 입력하여 결과를 계산하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="value">값</Label>
              <Input
                id="value"
                type="number"
                placeholder="예: 1000"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="percentage">퍼센트 (%)</Label>
              <Input
                id="percentage"
                type="number"
                placeholder="예: 20"
                value={percentage}
                onChange={(e) => {
                  setPercentage(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="0"
                max="1000"
                step="0.1"
              />
            </div>

            <Button onClick={calculate} className="w-full text-lg py-6" size="lg">
              계산하기
            </Button>

            {result !== null && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">계산 결과</p>
                    <p className="text-5xl font-bold text-green-600">
                      {formatNumber(result, { decimals: 2 })}
                    </p>
                  </div>
                  <div className="text-gray-600">
                    {value}의 {percentage}% = {formatNumber(result, { decimals: 2 })}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">계산 공식</h3>
              <p className="text-sm text-gray-600">
                결과 = 값 × (퍼센트 ÷ 100)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

