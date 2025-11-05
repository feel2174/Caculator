"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<{
    koreanAge: number;
    internationalAge: number;
    days: number;
    months: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      alert("미래 날짜는 입력할 수 없습니다.");
      return;
    }

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">만나이 계산기</h1>
          <p className="text-gray-600">
            생년월일을 입력하여 정확한 나이를 계산하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>생년월일 입력</CardTitle>
            <CardDescription>
              생년월일을 입력하면 한국 나이와 만나이를 계산합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birthDate">생년월일</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="text-lg"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <Button
              onClick={calculateAge}
              className="w-full text-lg py-6"
              size="lg"
            >
              나이 계산하기
            </Button>

            {result && (
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">한국 나이</p>
                      <p className="text-4xl font-bold text-purple-600">
                        {result.koreanAge}세
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">만나이</p>
                      <p className="text-4xl font-bold text-pink-600">
                        {result.internationalAge}세
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">총 일수</p>
                      <p className="text-2xl font-semibold text-gray-800">
                        {result.days.toLocaleString()}일
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">총 개월 수</p>
                      <p className="text-2xl font-semibold text-gray-800">
                        {result.months}개월
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">나이 계산 기준</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 한국 나이: 출생일 기준으로 +1세</li>
                <li>• 만나이: 생일이 지나야 +1세 (국제 표준)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

