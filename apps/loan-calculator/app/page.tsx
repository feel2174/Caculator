"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { formatNumber, formatCurrency } from "@cal/utils";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculate = () => {
    const loanAmountNum = parseFloat(loanAmount);
    const rateNum = parseFloat(rate) / 100 / 12; // 월 이자율
    const periodNum = parseFloat(period) * 12; // 월 수

    if (isNaN(loanAmountNum) || isNaN(rateNum) || isNaN(periodNum)) {
      return;
    }

    // 원리금균등분할 상환 계산
    const monthlyPayment =
      (loanAmountNum * rateNum * Math.pow(1 + rateNum, periodNum)) /
      (Math.pow(1 + rateNum, periodNum) - 1);

    const totalPayment = monthlyPayment * periodNum;
    const totalInterest = totalPayment - loanAmountNum;

    setResult({
      monthlyPayment,
      totalInterest,
      totalPayment,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">대출 계산기</h1>
          <p className="text-gray-600">
            대출 상환금을 계산하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>대출 정보 입력</CardTitle>
            <CardDescription>
              대출 금액, 이자율, 상환 기간을 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">대출 금액 (원)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="예: 100000000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">연 이자율 (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="예: 3.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">상환 기간 (년)</Label>
              <Input
                id="period"
                type="number"
                placeholder="예: 20"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="text-lg"
              />
            </div>

            <Button onClick={calculate} className="w-full text-lg py-6" size="lg">
              계산하기
            </Button>

            {result && (
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border-2 border-teal-200">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">월 상환금</p>
                      <p className="text-4xl font-bold text-teal-600">
                        {formatCurrency(result.monthlyPayment)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">총 상환금</p>
                        <p className="text-2xl font-bold text-cyan-600">
                          {formatCurrency(result.totalPayment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">총 이자</p>
                        <p className="text-2xl font-bold text-gray-700">
                          {formatCurrency(result.totalInterest)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">계산 방식</h3>
              <p className="text-sm text-gray-600">
                원리금균등분할 상환 방식으로 계산됩니다
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

