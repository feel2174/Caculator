"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";

export default function DDayCalculator() {
  const [targetDate, setTargetDate] = useState<string>("");
  const [dday, setDday] = useState<number | null>(null);
  const [isPast, setIsPast] = useState<boolean>(false);

  useEffect(() => {
    if (targetDate) {
      calculateDDay();
    }
  }, [targetDate]);

  const calculateDDay = () => {
    if (!targetDate) return;

    const target = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDday(diffDays);
    setIsPast(diffDays < 0);
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">D-Day 계산기</h1>
          <p className="text-gray-600">
            목표 날짜까지 남은 일수를 계산하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>목표 날짜 입력</CardTitle>
            <CardDescription>
              기념일, 시험일, 프로젝트 마감일 등을 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="targetDate">목표 날짜</Label>
              <Input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="text-lg"
              />
            </div>

            {dday !== null && (
              <div className="mt-8 p-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">D-Day</p>
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
                        ? `${Math.abs(dday)}일이 지났습니다`
                        : `${dday}일 남았습니다`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">D-Day 계산 기준</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• D-0: 목표 날짜 당일</li>
                <li>• D-1: 목표 날짜 하루 전</li>
                <li>• D+1: 목표 날짜 하루 후</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

