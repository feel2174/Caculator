import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cal/ui";

const calculatorIds = [
  "bmi",
  "age",
  "expect_age",
  "dday",
  "percentage",
  "unit",
  "interest",
  "loan",
  "color",
  "qr",
  "password",
  "text",
  "currency",
  "calorie",
  "salary",
] as const;

const icons = {
  bmi: "📊",
  age: "🎂",
  expect_age: "⏳",
  dday: "📅",
  percentage: "📈",
  unit: "🔄",
  interest: "💰",
  loan: "🏦",
  color: "🎨",
  qr: "📱",
  password: "🔐",
  text: "📝",
  currency: "💱",
  calorie: "🔥",
  salary: "💵",
};

const colors = {
  bmi: "from-blue-50 to-indigo-100",
  age: "from-purple-50 to-pink-100",
  expect_age: "from-emerald-50 to-green-100",
  dday: "from-orange-50 to-red-100",
  percentage: "from-green-50 to-emerald-100",
  unit: "from-cyan-50 to-blue-100",
  interest: "from-indigo-50 to-purple-100",
  loan: "from-teal-50 to-cyan-100",
  color: "from-violet-50 to-fuchsia-100",
  qr: "from-amber-50 to-yellow-100",
  password: "from-slate-50 to-gray-100",
  text: "from-rose-50 to-pink-100",
  currency: "from-sky-50 to-blue-100",
  calorie: "from-orange-50 to-red-100",
  salary: "from-green-50 to-teal-100",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  const calculators = calculatorIds.map((id) => ({
    id,
    title: t(`calculators.${id}.title`),
    description: t(`calculators.${id}.description`),
    href: `/${locale}/${id}`,
    icon: icons[id],
    color: colors[id],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
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
          <p>{t("totalCalculators", { count: calculators.length })}</p>
        </div>
      </div>
    </div>
  );
}

