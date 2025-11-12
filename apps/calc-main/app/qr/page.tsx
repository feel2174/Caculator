"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import { Alert, AlertDescription } from "@cal/ui";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (text) {
      generateQR();
    } else {
      setQrCode("");
      setError(null);
    }
  }, [text]);

  const generateQR = async () => {
    if (!text.trim()) {
      setQrCode("");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      const url = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCode(url);
    } catch (err) {
      console.error("QR code generation error:", err);
      setError("QR 코드 생성 중 오류가 발생했습니다.");
      setQrCode("");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (qrCode) {
      try {
        const link = document.createElement("a");
        link.href = qrCode;
        link.download = `qrcode-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        setError("QR 코드 다운로드 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">QR 코드 생성기</h1>
          <p className="text-gray-600">
            텍스트나 URL을 QR 코드로 변환하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>QR 코드 생성</CardTitle>
            <CardDescription>
              텍스트나 URL을 입력하면 QR 코드가 생성됩니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="text">텍스트 또는 URL</Label>
              <Input
                id="text"
                type="text"
                placeholder="예: https://example.com 또는 텍스트"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError(null);
                }}
                className="text-lg"
                maxLength={2000}
              />
              <p className="text-xs text-gray-500">
                {text.length}/2000자
              </p>
            </div>

            {isGenerating && (
              <div className="text-center text-gray-600">
                QR 코드 생성 중...
              </div>
            )}

            {qrCode && !isGenerating && (
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200">
                <div className="text-center space-y-4">
                  <div>
                    <img
                      src={qrCode}
                      alt="QR Code"
                      className="mx-auto border-2 border-gray-300 rounded-lg"
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                  <Button onClick={downloadQR} variant="outline">
                    QR 코드 다운로드
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

