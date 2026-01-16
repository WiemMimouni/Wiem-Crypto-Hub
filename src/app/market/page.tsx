import { MarketPageClient } from "@/components/client/pages/MarketPageClient";

// Mock data for the market page
const mockCoins = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    currentPrice: 43250.45,
    marketCap: 846542734829,
    marketCapRank: 1,
    totalVolume: 23456789012,
    priceChange24h: 1034.56,
    priceChangePercentage24h: 2.45,
    circulatingSupply: 19567890,
    maxSupply: 21000000,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    currentPrice: 2385.67,
    marketCap: 286789012345,
    marketCapRank: 2,
    totalVolume: 15678901234,
    priceChange24h: -29.87,
    priceChangePercentage24h: -1.23,
    circulatingSupply: 120234567,
    maxSupply: null,
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    currentPrice: 315.82,
    marketCap: 48567890123,
    marketCapRank: 4,
    totalVolume: 1234567890,
    priceChange24h: 2.78,
    priceChangePercentage24h: 0.89,
    circulatingSupply: 153856150,
    maxSupply: 200000000,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
    currentPrice: 98.45,
    marketCap: 43567890123,
    marketCapRank: 5,
    totalVolume: 2345678901,
    priceChange24h: 5.23,
    priceChangePercentage24h: 5.67,
    circulatingSupply: 442589070,
    maxSupply: null,
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://coin-images.coingecko.com/coins/images/975/large/cardano.png",
    currentPrice: 0.485,
    marketCap: 17234567890,
    marketCapRank: 8,
    totalVolume: 456789012,
    priceChange24h: -0.011,
    priceChangePercentage24h: -2.14,
    circulatingSupply: 35045020830,
    maxSupply: 45000000000,
  },
];

const mockGlobalData = {
  totalMarketCap: 1734567890123,
  totalVolume: 89567890123,
  marketCapChange24h: 2.15,
  bitcoinDominance: 48.7,
  ethereumDominance: 16.5,
  fearGreedIndex: {
    value: 72,
    classification: "Greed",
  },
};

export default function MarketPage() {
  return <MarketPageClient coins={mockCoins} globalData={mockGlobalData} />;
}
