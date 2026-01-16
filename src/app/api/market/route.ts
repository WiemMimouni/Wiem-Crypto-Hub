import { NextRequest, NextResponse } from "next/server";

interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

// Mock data for development/fallback
const MOCK_MARKET_DATA: CoinGeckoResponse[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 43250.45,
    market_cap: 846542734829,
    market_cap_rank: 1,
    fully_diluted_valuation: 908234567890,
    total_volume: 23456789012,
    high_24h: 44123.67,
    low_24h: 42890.34,
    price_change_24h: 1034.56,
    price_change_percentage_24h: 2.45,
    market_cap_change_24h: 20234567890,
    market_cap_change_percentage_24h: 2.45,
    circulating_supply: 19567890,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045.22,
    ath_change_percentage: -37.34,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 63665.89,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2385.67,
    market_cap: 286789012345,
    market_cap_rank: 2,
    fully_diluted_valuation: 286789012345,
    total_volume: 15678901234,
    high_24h: 2456.78,
    low_24h: 2234.56,
    price_change_24h: -29.87,
    price_change_percentage_24h: -1.23,
    market_cap_change_24h: -3567890123,
    market_cap_change_percentage_24h: -1.23,
    circulating_supply: 120234567,
    total_supply: 120234567,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -51.12,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 550678.45,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: {
      times: 82.5,
      currency: "usd",
      percentage: 8250.0,
    },
    last_updated: new Date().toISOString(),
  },
  // Add more mock coins as needed
];

async function fetchMarketData(
  page = 1,
  perPage = 100,
  currency = "usd",
  order = "market_cap_desc",
  sparkline = false,
  priceChangePercentage = "24h"
): Promise<CoinGeckoResponse[]> {
  try {
    const params = new URLSearchParams({
      vs_currency: currency,
      order,
      per_page: perPage.toString(),
      page: page.toString(),
      sparkline: sparkline.toString(),
      price_change_percentage: priceChangePercentage,
    });

    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?${params}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch market data from CoinGecko:", error);
    // Return mock data as fallback
    return MOCK_MARKET_DATA.slice((page - 1) * perPage, page * perPage);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const perPage = Math.min(
      parseInt(searchParams.get("per_page") || "100"),
      250
    ); // CoinGecko max is 250
    const currency = searchParams.get("currency") || "usd";
    const order = searchParams.get("order") || "market_cap_desc";
    const sparkline = searchParams.get("sparkline") === "true";
    const priceChangePercentage =
      searchParams.get("price_change_percentage") || "24h";

    // Validate parameters
    if (page < 1 || perPage < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const data = await fetchMarketData(
      page,
      perPage,
      currency,
      order,
      sparkline,
      priceChangePercentage
    );

    // Transform data to match our internal interface
    const transformedData = data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      currentPrice: coin.current_price,
      marketCap: coin.market_cap,
      marketCapRank: coin.market_cap_rank,
      totalVolume: coin.total_volume,
      priceChange24h: coin.price_change_24h,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      circulatingSupply: coin.circulating_supply,
      maxSupply: coin.max_supply,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
      ath: coin.ath,
      athChangePercentage: coin.ath_change_percentage,
      athDate: coin.ath_date,
      atl: coin.atl,
      atlChangePercentage: coin.atl_change_percentage,
      atlDate: coin.atl_date,
      lastUpdated: coin.last_updated,
    }));

    return NextResponse.json({
      success: true,
      data: transformedData,
      pagination: {
        page,
        perPage,
        total: transformedData.length,
      },
      metadata: {
        currency,
        order,
        sparkline,
        priceChangePercentage,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Market API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch market data",
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
