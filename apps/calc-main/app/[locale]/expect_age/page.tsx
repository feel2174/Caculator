"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { cn } from "@cal/ui";

type AnswerValue = "yes" | "no" | "male" | "female" | string;

interface QuestionAnswer {
  value: AnswerValue | null;
}

export default function ExpectAgeCalculator() {
  const t = useTranslations("expectAge");
  
  // 개인적인 자료 (12개 질문)
  const [personalAnswers, setPersonalAnswers] = useState<Record<number, QuestionAnswer>>({
    1: { value: null }, // 성별
    2: { value: null }, // 도시 지역
    3: { value: null }, // 작은 마을/농지
    4: { value: null }, // 조부모 85세
    5: { value: null }, // 조부모 4명 모두 80세
    6: { value: null }, // 부모 50세 이전 사망
    7: { value: null }, // 가족력 질병
    8: { value: null }, // 연소득 6000만원 이상
    9: { value: null }, // 대학 졸업
    10: { value: null }, // 대학원/전문직
    11: { value: null }, // 65세 이상 일하는 중
    12: { value: null }, // 배우자/친구와 동거
  });

  // 건강스타일 관련 사항 (11개 질문)
  const [healthAnswers, setHealthAnswers] = useState<Record<number, QuestionAnswer>>({
    1: { value: null }, // 책상에서 일
    2: { value: null }, // 무거운 육체 노동
    3: { value: null }, // 주5회 30분 운동
    4: { value: null }, // 주2-3회 운동
    5: { value: null }, // 매일 10시간 이상 수면
    6: { value: null }, // 감정적/공격적 성격
    7: { value: null }, // 편안하게 생각
    8: { value: null }, // 행복함
    9: { value: null }, // 작년 속도 위반
    10: { value: null }, // 여성 산부인과 검진
    11: { value: null }, // 담배
  });

  const [expectedAge, setExpectedAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalAnswer = (questionNum: number, value: AnswerValue) => {
    setPersonalAnswers((prev) => ({
      ...prev,
      [questionNum]: { value },
    }));
    setError(null);
  };

  const handleHealthAnswer = (questionNum: number, value: AnswerValue) => {
    setHealthAnswers((prev) => ({
      ...prev,
      [questionNum]: { value },
    }));
    setError(null);
  };

  const calculateExpectedAge = () => {
    setError(null);
    
    // 모든 질문이 답변되었는지 확인
    const allPersonalAnswered = Object.values(personalAnswers).every(
      (ans) => ans.value !== null
    );
    const allHealthAnswered = Object.values(healthAnswers).every(
      (ans) => ans.value !== null
    );

    if (!allPersonalAnswered || !allHealthAnswered) {
      setError(t("errors.allQuestionsRequired"));
      setExpectedAge(null);
      return;
    }

    // 기본 기대수명 (한국 평균 기대수명 기준)
    let age = 83;

    // 개인적인 자료 계산
    // Q1: 성별 (여성이면 +3세)
    if (personalAnswers[1].value === "female") {
      age += 3;
    }

    // Q2: 대도시 거주 (예: +1세)
    if (personalAnswers[2].value === "yes") {
      age += 1;
    }

    // Q3: 작은 마을/농지 (예: -1세)
    if (personalAnswers[3].value === "yes") {
      age -= 1;
    }

    // Q4: 조부모 85세 (예: +2세)
    if (personalAnswers[4].value === "yes") {
      age += 2;
    }

    // Q5: 조부모 4명 모두 80세 (예: +6세)
    if (personalAnswers[5].value === "yes") {
      age += 6;
    }

    // Q6: 부모 50세 이전 사망 (예: -4세)
    if (personalAnswers[6].value === "yes") {
      age -= 4;
    }

    // Q7: 가족력 질병 (예: -3세)
    if (personalAnswers[7].value === "yes") {
      age -= 3;
    }

    // Q8: 연소득 6000만원 이상 (예: +2세)
    if (personalAnswers[8].value === "yes") {
      age += 2;
    }

    // Q9: 대학 졸업 (예: +1세)
    if (personalAnswers[9].value === "yes") {
      age += 1;
    }

    // Q10: 대학원/전문직 (예: +2세)
    if (personalAnswers[10].value === "yes") {
      age += 2;
    }

    // Q11: 65세 이상 일하는 중 (예: +2세)
    if (personalAnswers[11].value === "yes") {
      age += 2;
    }

    // Q12: 배우자/친구와 동거 (예: +2세)
    if (personalAnswers[12].value === "yes") {
      age += 2;
    }

    // 건강스타일 계산
    // Q1: 책상에서 일 (예: -2세)
    if (healthAnswers[1].value === "yes") {
      age -= 2;
    }

    // Q2: 무거운 육체 노동 (예: -1세)
    if (healthAnswers[2].value === "yes") {
      age -= 1;
    }

    // Q3: 주5회 30분 운동 (예: +4세)
    if (healthAnswers[3].value === "yes") {
      age += 4;
    }

    // Q4: 주2-3회 운동 (예: +2세)
    if (healthAnswers[4].value === "yes") {
      age += 2;
    }

    // Q5: 매일 10시간 이상 수면 (예: -2세)
    if (healthAnswers[5].value === "yes") {
      age -= 2;
    }

    // Q6: 감정적/공격적 성격 (예: -3세)
    if (healthAnswers[6].value === "yes") {
      age -= 3;
    }

    // Q7: 편안하게 생각 (예: +2세)
    if (healthAnswers[7].value === "yes") {
      age += 2;
    }

    // Q8: 행복함 (예: +2세)
    if (healthAnswers[8].value === "yes") {
      age += 2;
    }

    // Q9: 작년 속도 위반 (예: -1세)
    if (healthAnswers[9].value === "yes") {
      age -= 1;
    }

    // Q10: 여성 산부인과 검진 (여성이고 예일 경우 +1세, 질문10은 성별에 따라 조건부)
    if (personalAnswers[1].value === "female" && healthAnswers[10].value === "yes") {
      age += 1;
    }

    // Q11: 담배
    const smoking = healthAnswers[11].value;
    if (smoking === "twoPacksOrMore") {
      age -= 10;
    } else if (smoking === "oneToTwoPacks") {
      age -= 7;
    } else if (smoking === "halfToOnePack") {
      age -= 4;
    }
    // 피우지않는다: 0점

    // 최소/최대값 제한
    age = Math.max(50, Math.min(120, age));

    setExpectedAge(Math.round(age));
  };

  const getResultComment = (age: number) => {
    if (age >= 90) {
      return {
        level: "excellent",
        comment: t("result.comments.excellent"),
        color: "text-emerald-600",
        bgColor: "from-emerald-50 to-green-50",
        borderColor: "border-emerald-200",
      };
    } else if (age >= 85) {
      return {
        level: "veryGood",
        comment: t("result.comments.veryGood"),
        color: "text-green-600",
        bgColor: "from-green-50 to-emerald-50",
        borderColor: "border-green-200",
      };
    } else if (age >= 80) {
      return {
        level: "good",
        comment: t("result.comments.good"),
        color: "text-blue-600",
        bgColor: "from-blue-50 to-cyan-50",
        borderColor: "border-blue-200",
      };
    } else if (age >= 75) {
      return {
        level: "average",
        comment: t("result.comments.average"),
        color: "text-yellow-600",
        bgColor: "from-yellow-50 to-amber-50",
        borderColor: "border-yellow-200",
      };
    } else if (age >= 70) {
      return {
        level: "belowAverage",
        comment: t("result.comments.belowAverage"),
        color: "text-orange-600",
        bgColor: "from-orange-50 to-amber-50",
        borderColor: "border-orange-200",
      };
    } else {
      return {
        level: "needsImprovement",
        comment: t("result.comments.needsImprovement"),
        color: "text-red-600",
        bgColor: "from-red-50 to-orange-50",
        borderColor: "border-red-200",
      };
    }
  };

  // 모던한 선택 버튼 컴포넌트
  const OptionButton = ({
    id,
    name,
    value,
    label,
    checked,
    onChange,
    variant = "default",
  }: {
    id: string;
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    variant?: "default" | "compact";
  }) => {
    const isCompact = variant === "compact";
    
    return (
      <label
        htmlFor={id}
        className={cn(
          "relative flex items-center cursor-pointer transition-all duration-200",
          isCompact ? "w-full" : "flex-1"
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
        <div
          className={cn(
            "w-full rounded-lg border-2 transition-all duration-200",
            "hover:shadow-md active:scale-[0.98]",
            checked
              ? "border-primary bg-primary/10 shadow-md"
              : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50",
            isCompact ? "px-4 py-3" : "px-6 py-4"
          )}
        >
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
                checked ? "text-primary" : "text-gray-700",
                isCompact ? "text-sm" : "text-base"
              )}
            >
              {label}
            </span>
          </div>
        </div>
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="space-y-6">
          {/* 개인적인 자료 섹션 */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>{t("personal.title")}</CardTitle>
              <CardDescription>{t("personal.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Q1: 성별 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">{t("personal.q1")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <OptionButton
                    id="gender-male"
                    name="gender"
                    value="male"
                    label={t("personal.options.male")}
                    checked={personalAnswers[1].value === "male"}
                    onChange={() => handlePersonalAnswer(1, "male")}
                  />
                  <OptionButton
                    id="gender-female"
                    name="gender"
                    value="female"
                    label={t("personal.options.female")}
                    checked={personalAnswers[1].value === "female"}
                    onChange={() => handlePersonalAnswer(1, "female")}
                  />
                </div>
              </div>

              {/* Q2-Q12 */}
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <div key={num} className="space-y-3">
                  <Label className="text-base font-semibold">{t(`personal.q${num}`)}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <OptionButton
                      id={`personal-${num}-yes`}
                      name={`personal-${num}`}
                      value="yes"
                      label={t("personal.options.yes")}
                      checked={personalAnswers[num].value === "yes"}
                      onChange={() => handlePersonalAnswer(num, "yes")}
                    />
                    <OptionButton
                      id={`personal-${num}-no`}
                      name={`personal-${num}`}
                      value="no"
                      label={t("personal.options.no")}
                      checked={personalAnswers[num].value === "no"}
                      onChange={() => handlePersonalAnswer(num, "no")}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 건강스타일 섹션 */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>{t("health.title")}</CardTitle>
              <CardDescription>{t("health.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Q1-Q9 */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div key={num} className="space-y-3">
                  <Label className="text-base font-semibold">{t(`health.q${num}`)}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <OptionButton
                      id={`health-${num}-yes`}
                      name={`health-${num}`}
                      value="yes"
                      label={t("health.options.yes")}
                      checked={healthAnswers[num].value === "yes"}
                      onChange={() => handleHealthAnswer(num, "yes")}
                    />
                    <OptionButton
                      id={`health-${num}-no`}
                      name={`health-${num}`}
                      value="no"
                      label={t("health.options.no")}
                      checked={healthAnswers[num].value === "no"}
                      onChange={() => handleHealthAnswer(num, "no")}
                    />
                  </div>
                </div>
              ))}

              {/* Q10: 여성 산부인과 검진 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">{t("health.q10")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <OptionButton
                    id="health-10-yes"
                    name="health-10"
                    value="yes"
                    label={t("health.options.yes")}
                    checked={healthAnswers[10].value === "yes"}
                    onChange={() => handleHealthAnswer(10, "yes")}
                  />
                  <OptionButton
                    id="health-10-no"
                    name="health-10"
                    value="no"
                    label={t("health.options.no")}
                    checked={healthAnswers[10].value === "no"}
                    onChange={() => handleHealthAnswer(10, "no")}
                  />
                </div>
              </div>

              {/* Q11: 담배 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">{t("health.q11")}</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: "twoPacksOrMore", label: t("health.options.twoPacksOrMore") },
                    { value: "oneToTwoPacks", label: t("health.options.oneToTwoPacks") },
                    { value: "halfToOnePack", label: t("health.options.halfToOnePack") },
                    { value: "none", label: t("health.options.noSmoking") },
                  ].map((option) => (
                    <OptionButton
                      key={option.value}
                      id={`health-11-${option.value}`}
                      name="health-11"
                      value={option.value}
                      label={option.label}
                      checked={healthAnswers[11].value === option.value}
                      onChange={() => handleHealthAnswer(11, option.value)}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={calculateExpectedAge}
            className="w-full text-lg py-6"
            size="lg"
          >
            {t("calculate")}
          </Button>

          {expectedAge !== null && (() => {
            const resultInfo = getResultComment(expectedAge);
            return (
              <Card
                className={cn(
                  "shadow-xl border-2 transition-all duration-300",
                  `bg-gradient-to-r ${resultInfo.bgColor} ${resultInfo.borderColor}`
                )}
              >
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <p className="text-sm font-medium text-gray-600">
                      {t("result.label")}
                    </p>
                    <p
                      className={cn(
                        "text-6xl font-bold transition-colors duration-300",
                        resultInfo.color
                      )}
                    >
                      {expectedAge}{t("result.unit")}
                    </p>
                    <div
                      className={cn(
                        "mt-4 p-4 rounded-lg bg-white/60 backdrop-blur-sm",
                        "border border-white/20"
                      )}
                    >
                      <p
                        className={cn(
                          "text-base font-medium leading-relaxed",
                          resultInfo.color
                        )}
                      >
                        {resultInfo.comment}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {t("result.description")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>{t("info.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{t("info.description")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}