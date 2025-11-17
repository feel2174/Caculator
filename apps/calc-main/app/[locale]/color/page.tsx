"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // # 제거 및 정규화
  const normalizedHex = hex.replace(/^#/, "").trim();
  
  // 3자리 또는 6자리 hex 확인
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(normalizedHex)) {
    return null;
  }

  let r: string, g: string, b: string;
  
  if (normalizedHex.length === 3) {
    // 3자리 hex를 6자리로 확장 (예: #abc -> #aabbcc)
    r = normalizedHex[0] + normalizedHex[0];
    g = normalizedHex[1] + normalizedHex[1];
    b = normalizedHex[2] + normalizedHex[2];
  } else {
    r = normalizedHex.substring(0, 2);
    g = normalizedHex.substring(2, 4);
    b = normalizedHex.substring(4, 6);
  }

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
}

function rgbToHsl(r: number, g: number, b: number): {
  h: number;
  s: number;
  l: number;
} {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverter() {
  const [hex, setHex] = useState<string>("#000000");
  const [rgb, setRgb] = useState<string>("rgb(0, 0, 0)");
  const [hsl, setHsl] = useState<string>("hsl(0, 0%, 0%)");
  const [error, setError] = useState<string | null>(null);

  const updateFromHex = (hexValue: string) => {
    setHex(hexValue);
    setError(null);

    if (!hexValue || hexValue.trim() === "") {
      setRgb("rgb(0, 0, 0)");
      setHsl("hsl(0, 0%, 0%)");
      return;
    }

    const rgbValue = hexToRgb(hexValue);
    if (rgbValue) {
      setRgb(`rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`);
      const hslValue = rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b);
      setHsl(`hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`);
      setError(null);
    } else {
      setError("올바른 HEX 색상 코드를 입력해주세요. (예: #000000 또는 #000)");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">색상 코드 변환기</h1>
          <p className="text-gray-600">
            HEX, RGB, HSL 색상 코드를 쉽게 변환하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>색상 코드 변환</CardTitle>
            <CardDescription>
              색상 코드를 입력하면 다양한 형식으로 변환됩니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="hex">HEX</Label>
              <div className="flex gap-2">
                <Input
                  id="hex"
                  type="text"
                  placeholder="#000000"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="text-lg flex-1 font-mono"
                  maxLength={7}
                />
                <div
                  className="w-16 h-10 rounded border-2 border-gray-300 flex-shrink-0"
                  style={{ backgroundColor: error ? "#000000" : hex }}
                />
              </div>
              <p className="text-xs text-gray-500">
                # 뒤에 3자리 또는 6자리 hex 코드를 입력하세요
              </p>
            </div>

            <div className="space-y-2">
              <Label>RGB</Label>
              <Input
                type="text"
                value={rgb}
                readOnly
                className="text-lg bg-muted font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label>HSL</Label>
              <Input
                type="text"
                value={hsl}
                readOnly
                className="text-lg bg-muted font-mono"
              />
            </div>

            {!error && (
              <div className="mt-6 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-lg border-2 border-violet-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">색상 미리보기</p>
                  <div
                    className="w-full h-32 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: hex }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

