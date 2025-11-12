// 폴백 환율 데이터 (API 실패 시 사용)
const fallbackRates: Record<string, number> = {
  KRW: 1,
  USD: 0.00075,
  EUR: 0.00069,
  JPY: 0.11,
  CNY: 0.0054,
  GBP: 0.00059,
  AUD: 0.0011,
  CAD: 0.0010,
  CHF: 0.00068,
  HKD: 0.0059,
  SGD: 0.0010,
};

export interface ExchangeRateResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}

/**
 * ExchangeRate-API를 사용하여 실시간 환율을 가져옵니다.
 * 무료 티어: 월 1,500 요청, 업데이트 주기: 24시간
 */
export async function getExchangeRates(
  baseCurrency: string = "KRW"
): Promise<Record<string, number>> {
  try {
    // ExchangeRate-API 사용 (무료, API 키 불필요)
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
      {
        next: { revalidate: 3600 }, // 1시간 캐싱
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ExchangeRateResponse = await response.json();

    // KRW를 기준으로 변환 (API는 baseCurrency 기준으로 반환)
    if (baseCurrency === "KRW") {
      return data.rates;
    }

    // 다른 통화 기준인 경우 KRW로 변환
    const baseRate = data.rates[baseCurrency] || 1;
    const krwRates: Record<string, number> = { KRW: 1 };
    
    Object.keys(data.rates).forEach((currency) => {
      if (currency !== baseCurrency) {
        krwRates[currency] = data.rates[currency] / baseRate;
      }
    });

    return krwRates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    // 폴백 데이터 반환
    return fallbackRates;
  }
}

