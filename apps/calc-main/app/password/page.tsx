"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import { validateRange } from "@cal/utils";

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    setError(null);
    setCopied(false);

    const lengthValidation = validateRange(length, 8, 128, "비밀번호 길이");
    if (!lengthValidation.valid) {
      setError(lengthValidation.error || "비밀번호 길이를 확인해주세요.");
      setPassword("");
      return;
    }

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") {
      setError("최소 하나의 옵션을 선택해주세요.");
      setPassword("");
      return;
    }

    let generatedPassword = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += chars[array[i] % chars.length];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("클립보드에 복사할 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">비밀번호 생성기</h1>
          <p className="text-gray-600">
            강력하고 안전한 비밀번호를 생성하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>비밀번호 생성</CardTitle>
            <CardDescription>
              옵션을 선택하고 비밀번호를 생성하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {copied && (
              <Alert variant="success">
                <AlertDescription>비밀번호가 클립보드에 복사되었습니다.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="length">길이: {length}</Label>
              <input
                id="length"
                type="range"
                min="8"
                max="128"
                value={length}
                onChange={(e) => {
                  setLength(parseInt(e.target.value));
                  setError(null);
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>8</span>
                <span>128</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>옵션 선택</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>대문자 (A-Z)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>소문자 (a-z)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>숫자 (0-9)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>특수문자 (!@#$...)</span>
                </label>
              </div>
            </div>

            <Button
              onClick={generatePassword}
              className="w-full text-lg py-6"
              size="lg"
            >
              비밀번호 생성
            </Button>

            {password && (
              <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border-2 border-slate-200">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={password}
                      readOnly
                      className="text-lg font-mono flex-1"
                    />
                    <Button onClick={copyToClipboard} variant="outline">
                      {copied ? "복사됨!" : "복사"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

