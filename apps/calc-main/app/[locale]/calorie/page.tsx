"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { Select } from "@cal/ui";
import { formatNumber } from "@cal/utils";
import { cn } from "@cal/ui";

export default function CalorieCalculator() {
  const t = useTranslations("calorie");
  
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
  const [goal, setGoal] = useState<string>("maintain");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateCalories = () => {
    setError(null);
    
    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!age || !height || !weight) {
      setError(t("errors.allFieldsRequired"));
      setResult(null);
      return;
    }

    if (ageNum < 1 || ageNum > 120) {
      setError(t("errors.invalidAge"));
      setResult(null);
      return;
    }

    if (heightNum < 50 || heightNum > 250) {
      setError(t("errors.invalidHeight"));
      setResult(null);
      return;
    }

    if (weightNum < 10 || weightNum > 300) {
      setError(t("errors.invalidWeight"));
      setResult(null);
      return;
    }

    // BMR 계산 (Mifflin-St Jeor Equation)
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // 활동 수준에 따른 TDEE 계산
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2, // 거의 운동 안 함
      light: 1.375, // 가벼운 운동 (주 1-3일)
      moderate: 1.55, // 보통 운동 (주 3-5일)
      active: 1.725, // 적극적인 운동 (주 6-7일)
      veryActive: 1.9, // 매우 적극적인 운동 (하루 2회 이상)
    };

    const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

    // 목표에 따른 칼로리 조정
    const goalAdjustments: Record<string, number> = {
      lose: -500, // 주당 0.5kg 감량
      maintain: 0,
      gain: 300, // 주당 0.3kg 증량
    };

    const goalCalories = tdee + (goalAdjustments[goal] || 0);

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
    });
  };

  const OptionButton = ({
    id,
    name,
    value,
    label,
    checked,
    onChange,
  }: {
    id: string;
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <label
      htmlFor={id}
      className={cn(
        "flex-1 cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md active:scale-[0.98]",
        checked
          ? "border-primary bg-primary/10 shadow-md"
          : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50",
        "px-4 py-3"
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className="flex items-center justify-center gap-2">
        <div
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200",
            checked
              ? "border-primary bg-primary"
              : "border-gray-300 bg-white"
          )}
        >
          {checked && (
            <div className="w-full h-full rounded-full bg-white scale-50" />
          )}
        </div>
        <span
          className={cn(
            "font-medium transition-colors",
            checked ? "text-primary" : "text-gray-700"
          )}
        >
          {label}
        </span>
      </div>
    </label>
  );

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

            <div className="space-y-3">
              <Label className="text-base font-semibold">{t("gender")}</Label>
              <div className="grid grid-cols-2 gap-3">
                <OptionButton
                  id="gender-male"
                  name="gender"
                  value="male"
                  label={t("options.male")}
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                <OptionButton
                  id="gender-female"
                  name="gender"
                  value="female"
                  label={t("options.female")}
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">{t("age")}</Label>
              <Input
                id="age"
                type="number"
                placeholder={t("placeholders.age")}
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">{t("height")}</Label>
              <Input
                id="height"
                type="number"
                placeholder={t("placeholders.height")}
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="50"
                max="250"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">{t("weight")}</Label>
              <Input
                id="weight"
                type="number"
                placeholder={t("placeholders.weight")}
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="10"
                max="300"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel">{t("activityLevel")}</Label>
              <Select
                id="activityLevel"
                options={[
                  { value: "sedentary", label: t("activityOptions.sedentary") },
                  { value: "light", label: t("activityOptions.light") },
                  { value: "moderate", label: t("activityOptions.moderate") },
                  { value: "active", label: t("activityOptions.active") },
                  { value: "veryActive", label: t("activityOptions.veryActive") },
                ]}
                value={activityLevel}
                onChange={(e) => {
                  setActivityLevel(e.target.value);
                  setError(null);
                }}
                className="text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">{t("goal")}</Label>
              <div className="grid grid-cols-3 gap-3">
                <OptionButton
                  id="goal-lose"
                  name="goal"
                  value="lose"
                  label={t("goalOptions.lose")}
                  checked={goal === "lose"}
                  onChange={() => setGoal("lose")}
                />
                <OptionButton
                  id="goal-maintain"
                  name="goal"
                  value="maintain"
                  label={t("goalOptions.maintain")}
                  checked={goal === "maintain"}
                  onChange={() => setGoal("maintain")}
                />
                <OptionButton
                  id="goal-gain"
                  name="goal"
                  value="gain"
                  label={t("goalOptions.gain")}
                  checked={goal === "gain"}
                  onChange={() => setGoal("gain")}
                />
              </div>
            </div>

            <Button
              onClick={calculateCalories}
              className="w-full text-lg py-6"
              size="lg"
            >
              {t("calculate")}
            </Button>

            {/* 결과 영역 - 고정 높이로 CLS 방지 */}
            <div className="min-h-[350px]">
              {result && (
                <div className="mt-8 space-y-4">
                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">{t("result.bmr")}</p>
                      <p className="text-4xl font-bold text-orange-600">
                        {formatNumber(result.bmr)} {t("result.unit")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("result.bmrDesc")}
                      </p>
                    </div>
                    <div className="border-t border-orange-200 pt-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">{t("result.tdee")}</p>
                      <p className="text-4xl font-bold text-red-600">
                        {formatNumber(result.tdee)} {t("result.unit")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("result.tdeeDesc")}
                      </p>
                    </div>
                    <div className="border-t border-orange-200 pt-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        {t("result.goalCalories")}
                      </p>
                      <p className="text-5xl font-bold text-orange-700">
                        {formatNumber(result.goalCalories)} {t("result.unit")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t(`result.goalDesc.${goal}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{t("info.title")}</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• {t("info.bmr")}</li>
                <li>• {t("info.tdee")}</li>
                <li>• {t("info.note")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




