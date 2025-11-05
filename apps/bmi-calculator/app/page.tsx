"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { formatNumber } from "@cal/utils";

export default function BMICalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBMI = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory("저체중");
    } else if (bmiValue < 23) {
      setCategory("정상");
    } else if (bmiValue < 25) {
      setCategory("과체중");
    } else if (bmiValue < 30) {
      setCategory("비만");
    } else {
      setCategory("고도 비만");
    }
  };

  const getCategoryColor = () => {
    if (!category) return "";
    if (category === "정상") return "text-green-600";
    if (category === "저체중" || category === "과체중") return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BMI 계산기</h1>
          <p className="text-gray-600">
            체질량지수를 계산하여 건강 상태를 확인하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>계산 정보 입력</CardTitle>
            <CardDescription>
              키와 몸무게를 입력하여 BMI를 계산하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="height">키 (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="예: 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">몸무게 (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="예: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg"
              />
            </div>

            <Button
              onClick={calculateBMI}
              className="w-full text-lg py-6"
              size="lg"
            >
              BMI 계산하기
            </Button>

            {bmi !== null && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">BMI 수치</p>
                    <p className="text-5xl font-bold text-blue-600">
                      {formatNumber(bmi, { decimals: 1 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">건강 상태</p>
                    <p className={`text-3xl font-bold ${getCategoryColor()}`}>
                      {category}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">BMI 기준표</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 18.5 미만: 저체중</li>
                <li>• 18.5 ~ 23: 정상</li>
                <li>• 23 ~ 25: 과체중</li>
                <li>• 25 ~ 30: 비만</li>
                <li>• 30 이상: 고도 비만</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

