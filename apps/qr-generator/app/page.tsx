"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Input } from "@cal/ui";
import { Label } from "@cal/ui";
import { Button } from "@cal/ui";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    if (text) {
      QRCode.toDataURL(text)
        .then((url) => {
          setQrCode(url);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setQrCode("");
    }
  }, [text]);

  const downloadQR = () => {
    if (qrCode) {
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = "qrcode.png";
      link.click();
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
            <div className="space-y-2">
              <Label htmlFor="text">텍스트 또는 URL</Label>
              <Input
                id="text"
                type="text"
                placeholder="예: https://example.com 또는 텍스트"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-lg"
              />
            </div>

            {qrCode && (
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

