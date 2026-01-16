import React from "react";
import HomeLayout from "@/components/layout/HomeLayout";
import { HomePageClient } from "@/components/client/pages/HomePageClient";

// Mock data - In a real app, this would come from your API
const mockMarketStats = {
  totalMarketCap: 3543389337839,
  totalVolume24h: 136657900250,
  btcDominance: 62.5,
  ethDominance: 9.5,
  activeCoins: 17615,
  marketCapChange24h: 0.7,
  volumeChange24h: -3.2,
  fearGreedIndex: 73,
};

const mockTrendingCoins = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    currentPrice: 111278,
    priceChange24h: 2598.32,
    priceChangePercentage24h: 2.4,
    marketCap: 2213329891462,
    volume24h: 37353528227,
    sparkline: [108500, 109200, 110100, 111000, 110800, 111100, 111278],
    rank: 1,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    currentPrice: 2789.39,
    priceChange24h: 174.33,
    priceChangePercentage24h: 6.67,
    marketCap: 335421234567,
    volume24h: 12345678901,
    sparkline: [2600, 2650, 2700, 2750, 2720, 2780, 2789],
    rank: 2,
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image:
      "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    currentPrice: 1.0,
    priceChange24h: 0.001,
    priceChangePercentage24h: 0.1,
    marketCap: 120000000000,
    volume24h: 45000000000,
    sparkline: [0.999, 1.0, 1.001, 1.0, 0.999, 1.0, 1.0],
    rank: 3,
  },
];

const mockNewsArticles = [
  {
    id: "1",
    title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
    summary:
      "Leading cryptocurrency Bitcoin has surged to unprecedented levels as major institutions continue to adopt digital assets, with MicroStrategy and Tesla leading the charge.",
    content: "",
    author: "John Doe",
    publishedAt: "2025-01-10T10:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=200&fit=crop",
    sourceUrl: "https://example.com/news/1",
    source: "CryptoNews",
    category: "bitcoin" as const,
    readTime: 3,
    tags: ["bitcoin", "institutional", "adoption"],
  },
  {
    id: "2",
    title: "Ethereum 2.0 Staking Rewards Hit Record Numbers",
    summary:
      "Ethereum validators are seeing increased rewards as the network continues to grow and mature, with over 32 million ETH now staked.",
    content: "",
    author: "Jane Smith",
    publishedAt: "2025-01-10T08:30:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    sourceUrl: "https://example.com/news/2",
    source: "DeFi Today",
    category: "ethereum" as const,
    readTime: 4,
    tags: ["ethereum", "staking", "rewards"],
  },
  {
    id: "3",
    title: "DeFi TVL Surpasses $200 Billion Milestone",
    summary:
      "Decentralized Finance protocols have reached a new milestone with Total Value Locked exceeding $200 billion across all chains.",
    content: "",
    author: "Mike Johnson",
    publishedAt: "2025-01-10T06:15:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
    sourceUrl: "https://example.com/news/3",
    source: "DeFi Pulse",
    category: "defi" as const,
    readTime: 5,
    tags: ["defi", "tvl", "milestone"],
  },
];

const mockPortfolio = {
  id: "default-portfolio",
  name: "My Portfolio",
  totalValue: 33553.575,
  totalCost: 31000,
  totalPnL: 2553.575,
  totalPnLPercentage: 8.24,
  dayChange: 680.23,
  dayChangePercentage: 2.07,
  holdings: [
    {
      coinId: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      amount: 0.5,
      currentValue: 21625.225,
      allocation: 64.4,
      priceChange24h: 2.45,
    },
    {
      coinId: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      amount: 5,
      currentValue: 11928.35,
      allocation: 35.5,
      priceChange24h: -1.23,
    },
  ],
};

export default function HomePage() {
  return (
    <HomeLayout>
      <HomePageClient
        marketStats={mockMarketStats}
        trendingCoins={mockTrendingCoins}
        newsArticles={mockNewsArticles}
        portfolio={mockPortfolio}
      />
    </HomeLayout>
  );
}
