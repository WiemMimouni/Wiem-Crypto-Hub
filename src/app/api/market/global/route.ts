import { NextRequest, NextResponse } from "next/server";

interface CoinGeckoGlobalResponse {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

// Mock global data for development/fallback
const MOCK_GLOBAL_DATA = {
  active_cryptocurrencies: 12847,
  upcoming_icos: 0,
  ongoing_icos: 49,
  ended_icos: 3376,
  markets: 1098,
  total_market_cap: {
    usd: 1734567890123,
    btc: 40567890,
    eth: 728901234,
  },
  total_volume: {
    usd: 89567890123,
    btc: 2098765,
    eth: 37567890,
  },
  market_cap_percentage: {
    btc: 48.7,
    eth: 16.5,
    usdt: 3.2,
    bnb: 2.8,
    sol: 1.9,
  },
  market_cap_change_percentage_24h_usd: 2.15,
  updated_at: Math.floor(Date.now() / 1000),
};

async function fetchGlobalData(): Promise<CoinGeckoGlobalResponse["data"]> {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/global`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: CoinGeckoGlobalResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch global data from CoinGecko:", error);
    // Return mock data as fallback
    return MOCK_GLOBAL_DATA;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get("currency") || "usd";

    const globalData = await fetchGlobalData();

    // Calculate fear and greed index (mock implementation)
    const fearGreedIndex = {
      value: Math.floor(Math.random() * 100) + 1, // 1-100
      classification: "Neutral", // Will be calculated based on value
      timestamp: new Date().toISOString(),
    };

    // Classify fear and greed
    if (fearGreedIndex.value <= 25) {
      fearGreedIndex.classification = "Extreme Fear";
    } else if (fearGreedIndex.value <= 45) {
      fearGreedIndex.classification = "Fear";
    } else if (fearGreedIndex.value <= 55) {
      fearGreedIndex.classification = "Neutral";
    } else if (fearGreedIndex.value <= 75) {
      fearGreedIndex.classification = "Greed";
    } else {
      fearGreedIndex.classification = "Extreme Greed";
    }

    // Calculate additional metrics
    const totalMarketCap =
      globalData.total_market_cap[currency] || globalData.total_market_cap.usd;
    const totalVolume =
      globalData.total_volume[currency] || globalData.total_volume.usd;

    const volumeToMarketCapRatio = (totalVolume / totalMarketCap) * 100;
    const bitcoinDominance = globalData.market_cap_percentage.btc || 0;
    const ethereumDominance = globalData.market_cap_percentage.eth || 0;
    const altcoinDominance = 100 - bitcoinDominance - ethereumDominance;

    // Transform data to match our internal interface
    const transformedData = {
      totalMarketCap,
      totalVolume,
      marketCapChange24h: globalData.market_cap_change_percentage_24h_usd,
      activeCryptocurrencies: globalData.active_cryptocurrencies,
      markets: globalData.markets,
      bitcoinDominance,
      ethereumDominance,
      altcoinDominance,
      volumeToMarketCapRatio,
      fearGreedIndex,
      marketCapPercentage: globalData.market_cap_percentage,
      upcomingIcos: globalData.upcoming_icos,
      ongoingIcos: globalData.ongoing_icos,
      endedIcos: globalData.ended_icos,
      lastUpdated: new Date(globalData.updated_at * 1000).toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: transformedData,
      metadata: {
        currency,
        source: "coingecko",
        cacheTime: 300, // 5 minutes
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Global market API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch global market data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
