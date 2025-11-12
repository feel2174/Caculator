import { NextResponse } from "next/server";
import { getExchangeRates } from "../../../lib/exchange-rate-api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const baseCurrency = searchParams.get("base") || "KRW";

    const rates = await getExchangeRates(baseCurrency);

    return NextResponse.json(
      {
        success: true,
        rates,
        base: baseCurrency,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch exchange rates",
      },
      { status: 500 }
    );
  }
}

