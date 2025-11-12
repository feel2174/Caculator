"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";
import { Label } from "@cal/ui";

export default function TextCounter() {
  const [text, setText] = useState<string>("");

  const characterCount = text.length;
  const characterCountNoSpaces = text.replace(/\s/g, "").length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === "" ? 0 : text.split("\n").length;
  const paragraphCount =
    text.trim() === "" ? 0 : text.trim().split(/\n\s*\n/).length;
  const byteCount = new Blob([text]).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">텍스트 카운터</h1>
          <p className="text-gray-600">
            텍스트의 글자 수, 단어 수, 줄 수를 실시간으로 계산하세요
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>텍스트 입력</CardTitle>
            <CardDescription>
              텍스트를 입력하면 자동으로 통계가 계산됩니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">텍스트</Label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="텍스트를 입력하세요..."
              />
              <p className="text-xs text-gray-500">
                {characterCount.toLocaleString()}자 입력됨
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">글자 수</p>
                <p className="text-2xl font-bold text-rose-600">
                  {characterCount.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">글자 수 (공백 제외)</p>
                <p className="text-2xl font-bold text-rose-600">
                  {characterCountNoSpaces.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">단어 수</p>
                <p className="text-2xl font-bold text-pink-600">
                  {wordCount.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">줄 수</p>
                <p className="text-2xl font-bold text-pink-600">
                  {lineCount.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">문단 수</p>
                <p className="text-2xl font-bold text-pink-600">
                  {paragraphCount.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">바이트 수</p>
                <p className="text-2xl font-bold text-pink-600">
                  {byteCount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

