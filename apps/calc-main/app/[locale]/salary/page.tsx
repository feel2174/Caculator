"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { Select } from "@cal/ui";
import { formatNumber, formatCurrency } from "@cal/utils";
import { cn } from "@cal/ui";

export default function SalaryCalculator() {
  const t = useTranslations("salary");
  
  const [salary, setSalary] = useState<string>("");
  const [salaryType, setSalaryType] = useState<"monthly" | "annual">("monthly");
  const [dependents, setDependents] = useState<string>("0");
  const [hasInsurance, setHasInsurance] = useState<boolean>(true);
  const [hasPension, setHasPension] = useState<boolean>(true);
  const [hasEmploymentInsurance, setHasEmploymentInsurance] = useState<boolean>(true);
  
  const [result, setResult] = useState<{
    grossSalary: number;
    incomeTax: number;
    localIncomeTax: number;
    nationalPension: number;
    healthInsurance: number;
    employmentInsurance: number;
    longTermCare: number;
    totalDeduction: number;
    netSalary: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateSalary = () => {
    setError(null);
    
    const salaryNum = parseFloat(salary);
    const dependentsNum = parseInt(dependents) || 0;

    if (!salary || salaryNum <= 0) {
      setError(t("errors.salaryRequired"));
      setResult(null);
      return;
    }

    // 연봉 또는 월급 변환
    const annualSalary = salaryType === "annual" ? salaryNum : salaryNum * 12;
    const monthlySalary = salaryType === "annual" ? salaryNum / 12 : salaryNum;

    // 4대 보험 계산 (2024년 기준)
    const nationalPensionRate = 0.045; // 4.5%
    const healthInsuranceRate = 0.03075; // 3.075%
    const employmentInsuranceRate = 0.009; // 0.9%
    const longTermCareRate = 0.1227; // 건강보험료의 12.27%

    // 보험료 계산 (월 기준)
    const nationalPension = hasPension 
      ? Math.round(Math.min(monthlySalary * nationalPensionRate, 276000)) 
      : 0;
    const healthInsurance = hasInsurance 
      ? Math.round(Math.min(monthlySalary * healthInsuranceRate, 469125)) 
      : 0;
    const employmentInsurance = hasEmploymentInsurance 
      ? Math.round(Math.min(monthlySalary * employmentInsuranceRate, 91080)) 
      : 0;
    const longTermCare = hasInsurance 
      ? Math.round(healthInsurance * longTermCareRate) 
      : 0;

    // 소득세 계산 (간이 계산)
    // 실제로는 누진세율 적용 필요 (간이 계산)
    const annualTaxableIncome = annualSalary - (nationalPension * 12) - (healthInsurance * 12) - (employmentInsurance * 12);
    const basicDeduction = 1500000; // 기본공제 150만원
    const dependentsDeduction = dependentsNum * 1500000; // 부양가족 공제 (1인당 150만원)
    
    const taxableIncome = Math.max(0, annualTaxableIncome - basicDeduction - dependentsDeduction);
    
    // 소득세 계산 (간이 계산)
    let incomeTax = 0;
    if (taxableIncome > 120000000) {
      incomeTax = (taxableIncome - 120000000) * 0.45 + 12600000;
    } else if (taxableIncome > 88000000) {
      incomeTax = (taxableIncome - 88000000) * 0.42 + 14920000;
    } else if (taxableIncome > 46000000) {
      incomeTax = (taxableIncome - 46000000) * 0.40 + 5820000;
    } else if (taxableIncome > 12000000) {
      incomeTax = (taxableIncome - 12000000) * 0.35 + 1080000;
    } else {
      incomeTax = taxableIncome * 0.06;
    }
    
    const monthlyIncomeTax = Math.round(Math.max(0, incomeTax / 12));
    const localIncomeTax = Math.round(monthlyIncomeTax * 0.1); // 지방소득세 10%

    // 총 공제액
    const totalDeduction = 
      nationalPension + 
      healthInsurance + 
      employmentInsurance + 
      longTermCare + 
      monthlyIncomeTax + 
      localIncomeTax;

    // 실수령액
    const netSalary = monthlySalary - totalDeduction;

    setResult({
      grossSalary: monthlySalary,
      incomeTax: monthlyIncomeTax,
      localIncomeTax,
      nationalPension,
      healthInsurance,
      employmentInsurance,
      longTermCare,
      totalDeduction,
      netSalary,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
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

            <div className="space-y-2">
              <Label htmlFor="salaryType">{t("salaryType")}</Label>
              <Select
                id="salaryType"
                options={[
                  { value: "monthly", label: t("salaryTypeOptions.monthly") },
                  { value: "annual", label: t("salaryTypeOptions.annual") },
                ]}
                value={salaryType}
                onChange={(e) => {
                  setSalaryType(e.target.value as "monthly" | "annual");
                  setError(null);
                }}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">
                {salaryType === "monthly" ? t("monthlySalary") : t("annualSalary")}
              </Label>
              <Input
                id="salary"
                type="number"
                placeholder={t("placeholders.salary")}
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="0"
                step="10000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dependents">{t("dependents")}</Label>
              <Input
                id="dependents"
                type="number"
                placeholder={t("placeholders.dependents")}
                value={dependents}
                onChange={(e) => {
                  setDependents(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                min="0"
                max="10"
              />
              <p className="text-xs text-gray-500">{t("dependentsDesc")}</p>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">{t("insurance")}</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPension}
                    onChange={(e) => setHasPension(e.target.checked)}
                    className="w-4 h-4 text-primary"
                  />
                  <span>{t("insuranceOptions.nationalPension")}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="w-4 h-4 text-primary"
                  />
                  <span>{t("insuranceOptions.healthInsurance")}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasEmploymentInsurance}
                    onChange={(e) => setHasEmploymentInsurance(e.target.checked)}
                    className="w-4 h-4 text-primary"
                  />
                  <span>{t("insuranceOptions.employmentInsurance")}</span>
                </label>
              </div>
            </div>

            <Button
              onClick={calculateSalary}
              className="w-full text-lg py-6"
              size="lg"
            >
              {t("calculate")}
            </Button>

            {result && (
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-200">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-2">{t("result.netSalary")}</p>
                    <p className="text-5xl font-bold text-green-700">
                      {formatCurrency(result.netSalary, "KRW")}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("result.grossSalary")}</span>
                    <span className="font-semibold">
                      {formatCurrency(result.grossSalary, "KRW")}
                    </span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      {t("result.deductions")}
                    </p>
                    {result.nationalPension > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t("result.nationalPension")}</span>
                        <span>{formatCurrency(result.nationalPension, "KRW")}</span>
                      </div>
                    )}
                    {result.healthInsurance > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t("result.healthInsurance")}</span>
                        <span>{formatCurrency(result.healthInsurance, "KRW")}</span>
                      </div>
                    )}
                    {result.longTermCare > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t("result.longTermCare")}</span>
                        <span>{formatCurrency(result.longTermCare, "KRW")}</span>
                      </div>
                    )}
                    {result.employmentInsurance > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t("result.employmentInsurance")}
                        </span>
                        <span>{formatCurrency(result.employmentInsurance, "KRW")}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t("result.incomeTax")}</span>
                      <span>{formatCurrency(result.incomeTax, "KRW")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t("result.localIncomeTax")}</span>
                      <span>{formatCurrency(result.localIncomeTax, "KRW")}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                      <span>{t("result.totalDeduction")}</span>
                      <span className="text-red-600">
                        {formatCurrency(result.totalDeduction, "KRW")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{t("info.title")}</h3>
              <p className="text-sm text-gray-600">{t("info.description")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

