import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";

const calculators = [
  {
    id: "bmi",
    title: "BMI 계산기",
    description: "체질량지수를 계산하여 건강 상태를 확인하세요",
    href: "/bmi",
    color: "from-blue-50 to-indigo-100",
    icon: "📊",
  },
  {
    id: "age",
    title: "만나이 계산기",
    description: "생년월일을 입력하여 정확한 나이를 계산하세요",
    href: "/age",
    color: "from-purple-50 to-pink-100",
    icon: "🎂",
  },
  {
    id: "dday",
    title: "D-Day 계산기",
    description: "목표 날짜까지 남은 일수를 계산하세요",
    href: "/dday",
    color: "from-orange-50 to-red-100",
    icon: "📅",
  },
  {
    id: "percentage",
    title: "퍼센트 계산기",
    description: "퍼센트 계산을 쉽고 빠르게 할 수 있습니다",
    href: "/percentage",
    color: "from-green-50 to-emerald-100",
    icon: "📈",
  },
  {
    id: "unit",
    title: "단위 변환기",
    description: "다양한 단위를 쉽고 빠르게 변환하세요",
    href: "/unit",
    color: "from-cyan-50 to-blue-100",
    icon: "🔄",
  },
  {
    id: "interest",
    title: "이자 계산기",
    description: "예금, 적금, 대출의 이자를 계산하세요",
    href: "/interest",
    color: "from-indigo-50 to-purple-100",
    icon: "💰",
  },
  {
    id: "loan",
    title: "대출 계산기",
    description: "대출 상환금을 계산하세요",
    href: "/loan",
    color: "from-teal-50 to-cyan-100",
    icon: "🏦",
  },
  {
    id: "color",
    title: "색상 코드 변환기",
    description: "HEX, RGB, HSL 색상 코드를 쉽게 변환하세요",
    href: "/color",
    color: "from-violet-50 to-fuchsia-100",
    icon: "🎨",
  },
  {
    id: "qr",
    title: "QR 코드 생성기",
    description: "텍스트나 URL을 QR 코드로 변환하세요",
    href: "/qr",
    color: "from-amber-50 to-yellow-100",
    icon: "📱",
  },
  {
    id: "password",
    title: "비밀번호 생성기",
    description: "강력하고 안전한 비밀번호를 생성하세요",
    href: "/password",
    color: "from-slate-50 to-gray-100",
    icon: "🔐",
  },
  {
    id: "text",
    title: "텍스트 카운터",
    description: "텍스트의 글자 수, 단어 수, 줄 수를 실시간으로 계산하세요",
    href: "/text",
    color: "from-rose-50 to-pink-100",
    icon: "📝",
  },
  {
    id: "currency",
    title: "환율 계산기",
    description: "다양한 통화 간 환율을 계산하세요",
    href: "/currency",
    color: "from-sky-50 to-blue-100",
    icon: "💱",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            계산기 도구 모음
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            일상생활에 필요한 다양한 계산기와 유틸리티 도구를 한 곳에서
            사용하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {calculators.map((calc) => (
            <Link key={calc.id} href={calc.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{calc.icon}</span>
                    <CardTitle className="text-lg">{calc.title}</CardTitle>
                  </div>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>총 {calculators.length}개의 계산기 도구를 제공합니다</p>
        </div>
      </div>
    </div>
  );
}

