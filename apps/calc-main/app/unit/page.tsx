"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Select } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { formatNumber } from "@cal/utils";
import { isValidNumber } from "@cal/utils";

const conversions = {
  length: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    inch: 39.3701,
    ft: 3.28084,
    yd: 1.09361,
    mile: 0.000621371,
  },
  weight: {
    kg: 1,
    g: 1000,
    mg: 1000000,
    lb: 2.20462,
    oz: 35.274,
    ton: 0.001,
  },
  temperature: {
    celsius: "celsius",
    fahrenheit: "fahrenheit",
    kelvin: "kelvin",
  },
};

const unitLabels: Record<string, Record<string, string>> = {
  length: {
    m: "미터 (m)",
    km: "킬로미터 (km)",
    cm: "센티미터 (cm)",
    mm: "밀리미터 (mm)",
    inch: "인치 (inch)",
    ft: "피트 (ft)",
    yd: "야드 (yd)",
    mile: "마일 (mile)",
  },
  weight: {
    kg: "킬로그램 (kg)",
    g: "그램 (g)",
    mg: "밀리그램 (mg)",
    lb: "파운드 (lb)",
    oz: "온스 (oz)",
    ton: "톤 (ton)",
  },
  temperature: {
    celsius: "섭씨 (°C)",
    fahrenheit: "화씨 (°F)",
    kelvin: "켈빈 (K)",
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<"length" | "weight" | "temperature">(
    "length"
  );
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("km");
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    setError(null);
    const valueNum = parseFloat(value);

    if (!isValidNumber(value)) {
      setError("올바른 숫자를 입력해주세요.");
      setResult(null);
      return;
    }

    if (category === "temperature") {
      let celsius = 0;
      if (fromUnit === "celsius") celsius = valueNum;
      else if (fromUnit === "fahrenheit")
        celsius = ((valueNum - 32) * 5) / 9;
      else if (fromUnit === "kelvin") celsius = valueNum - 273.15;

      let converted = 0;
      if (toUnit === "celsius") converted = celsius;
      else if (toUnit === "fahrenheit") converted = (celsius * 9) / 5 + 32;
      else if (toUnit === "kelvin") converted = celsius + 273.15;

      setResult(converted);
    } else {
      const fromFactor = conversions[category][fromUnit as keyof typeof conversions.length];
      const toFactor = conversions[category][toUnit as keyof typeof conversions.length];
      
      if (fromFactor === undefined || toFactor === undefined) {
        setError("단위 변환에 실패했습니다.");
        setResult(null);
        return;
      }

      const baseValue = valueNum / fromFactor;
      const converted = baseValue * toFactor;
      setResult(converted);
    }
  };

  const units = category === "temperature" 
    ? Object.keys(conversions.temperature)
    : Object.keys(conversions[category]);

  const unitOptions = units.map(unit => ({
    value: unit,
    label: unitLabels[category]?.[unit] || unit,
  }));

  const categoryOptions = [
    { value: "length", label: "길이" },
    { value: "weight", label: "무게" },
    { value: "temperature", label: "온도" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">단위 변환기</h1>
          <p className="text-gray-600">
            다양한 단위를 쉽고 빠르게 변환하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>단위 변환</CardTitle>
            <CardDescription>
              변환할 단위를 선택하고 값을 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>카테고리</Label>
              <Select
                value={category}
                onChange={(e) => {
                  const newCategory = e.target.value as typeof category;
                  setCategory(newCategory);
                  if (newCategory === "length") {
                    setFromUnit("m");
                    setToUnit("km");
                  } else if (newCategory === "weight") {
                    setFromUnit("kg");
                    setToUnit("g");
                  } else {
                    setFromUnit("celsius");
                    setToUnit("fahrenheit");
                  }
                  setValue("");
                  setResult(null);
                  setError(null);
                }}
                options={categoryOptions}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>변환 전</Label>
                <Select
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value);
                    setResult(null);
                  }}
                  options={unitOptions}
                />
                <Input
                  type="number"
                  placeholder="값 입력"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError(null);
                  }}
                  onKeyUp={convert}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>변환 후</Label>
                <Select
                  value={toUnit}
                  onChange={(e) => {
                    setToUnit(e.target.value);
                    setResult(null);
                  }}
                  options={unitOptions}
                />
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-lg items-center">
                  {result !== null ? formatNumber(result, { decimals: 4 }) : "-"}
                </div>
              </div>
            </div>

            {result !== null && (
              <div className="mt-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-center text-gray-700">
                  {value} {unitLabels[category]?.[fromUnit] || fromUnit} = {formatNumber(result, { decimals: 4 })}{" "}
                  {unitLabels[category]?.[toUnit] || toUnit}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

