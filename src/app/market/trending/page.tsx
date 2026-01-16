import { TrendingPageClient } from "@/components/client/pages/TrendingPageClient";
import { Metadata } from "next";

// Mock trending coins data
const mockTrendingCoins = [
  {
    id: "pepe",
    symbol: "pepe",
    name: "Pepe",
    image:
      "https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg",
    currentPrice: 0.00001234,
    priceChange24h: 0.00000156,
    priceChangePercentage24h: 14.52,
    marketCap: 5234567890,
    marketCapRank: 45,
    totalVolume: 234567890,
    circulatingSupply: 420690000000000,
    sparkline: [0.000011, 0.0000115, 0.0000108, 0.000012, 0.00001234],
    trendRank: 1,
    searchVolume24h: 1250000,
  },
  {
    id: "shiba-inu",
    symbol: "shib",
    name: "Shiba Inu",
    image:
      "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png",
    currentPrice: 0.000008945,
    priceChange24h: 0.000000756,
    priceChangePercentage24h: 9.23,
    marketCap: 5278901234,
    marketCapRank: 12,
    totalVolume: 156789012,
    circulatingSupply: 589735030408323,
    sparkline: [0.0000082, 0.0000084, 0.0000083, 0.0000088, 0.000008945],
    trendRank: 2,
    searchVolume24h: 980000,
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png",
    currentPrice: 0.0823,
    priceChange24h: 0.0045,
    priceChangePercentage24h: 5.78,
    marketCap: 11789012345,
    marketCapRank: 8,
    totalVolume: 567890123,
    circulatingSupply: 143245678901,
    sparkline: [0.078, 0.079, 0.0785, 0.081, 0.0823],
    trendRank: 3,
    searchVolume24h: 850000,
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image:
      "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    currentPrice: 14.67,
    priceChange24h: 0.89,
    priceChangePercentage24h: 6.45,
    marketCap: 8234567890,
    marketCapRank: 15,
    totalVolume: 234567890,
    circulatingSupply: 561234567,
    sparkline: [13.8, 14.1, 13.95, 14.4, 14.67],
    trendRank: 4,
    searchVolume24h: 720000,
  },
  {
    id: "polygon",
    symbol: "matic",
    name: "Polygon",
    image:
      "https://coin-images.coingecko.com/coins/images/4713/large/matic-token-icon.png",
    currentPrice: 0.7234,
    priceChange24h: 0.0345,
    priceChangePercentage24h: 5.01,
    marketCap: 6789012345,
    marketCapRank: 18,
    totalVolume: 167890123,
    circulatingSupply: 9378531687,
    sparkline: [0.689, 0.701, 0.695, 0.715, 0.7234],
    trendRank: 5,
    searchVolume24h: 650000,
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    image:
      "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    currentPrice: 28.45,
    priceChange24h: 1.23,
    priceChangePercentage24h: 4.52,
    marketCap: 10567890123,
    marketCapRank: 13,
    totalVolume: 289012345,
    circulatingSupply: 371345678,
    sparkline: [27.2, 27.8, 27.5, 28.1, 28.45],
    trendRank: 6,
    searchVolume24h: 580000,
  },
  {
    id: "uniswap",
    symbol: "uni",
    name: "Uniswap",
    image:
      "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-uni.png",
    currentPrice: 6.78,
    priceChange24h: 0.234,
    priceChangePercentage24h: 3.58,
    marketCap: 4123456789,
    marketCapRank: 22,
    totalVolume: 134567890,
    circulatingSupply: 608234567,
    sparkline: [6.54, 6.62, 6.58, 6.72, 6.78],
    trendRank: 7,
    searchVolume24h: 520000,
  },
  {
    id: "the-sandbox",
    symbol: "sand",
    name: "The Sandbox",
    image:
      "https://coin-images.coingecko.com/coins/images/12129/large/sandbox_logo.jpg",
    currentPrice: 0.4567,
    priceChange24h: 0.0123,
    priceChangePercentage24h: 2.77,
    marketCap: 1023456789,
    marketCapRank: 65,
    totalVolume: 45678901,
    circulatingSupply: 2241234567,
    sparkline: [0.444, 0.45, 0.448, 0.453, 0.4567],
    trendRank: 8,
    searchVolume24h: 480000,
  },
  {
    id: "arbitrum",
    symbol: "arb",
    name: "Arbitrum",
    image:
      "https://coin-images.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg",
    currentPrice: 1.23,
    priceChange24h: 0.045,
    priceChangePercentage24h: 3.79,
    marketCap: 1543210987,
    marketCapRank: 35,
    totalVolume: 87654321,
    circulatingSupply: 1254321098,
    sparkline: [1.18, 1.2, 1.19, 1.22, 1.23],
    trendRank: 9,
    searchVolume24h: 420000,
  },
  {
    id: "render-token",
    symbol: "rndr",
    name: "Render",
    image:
      "https://coin-images.coingecko.com/coins/images/11636/large/rndr.png",
    currentPrice: 3.45,
    priceChange24h: 0.089,
    priceChangePercentage24h: 2.65,
    marketCap: 1345678901,
    marketCapRank: 42,
    totalVolume: 56789012,
    circulatingSupply: 389765432,
    sparkline: [3.36, 3.4, 3.38, 3.43, 3.45],
    trendRank: 10,
    searchVolume24h: 380000,
  },
];

const mockTrendingStats = {
  totalTrending: 100,
  avgPriceChange: 6.23,
  topGainer: {
    name: "Pepe",
    symbol: "PEPE",
    change: 14.52,
  },
  totalSearchVolume: 6048000,
  updatedAt: new Date().toISOString(),
};

export const metadata: Metadata = {
  title: "Trending Cryptocurrencies | CryptoTracker",
  description:
    "Discover the most trending cryptocurrencies based on search volume, price movement, and market activity",
};

export default function TrendingPage() {
  return (
    <TrendingPageClient
      trendingCoins={mockTrendingCoins}
      trendingStats={mockTrendingStats}
    />
  );
}
