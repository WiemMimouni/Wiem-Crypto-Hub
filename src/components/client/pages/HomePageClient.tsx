"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MarketOverview } from "@/components/market/MarketOverview";
import { TrendingCoins } from "@/components/market/TrendingCoins";
import { FeaturedNews } from "@/components/news/FeaturedNews";
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { QuickActions } from "@/components/common/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star } from "lucide-react";

interface MockMarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  activeCoins: number;
  marketCapChange24h: number;
  volumeChange24h: number;
  fearGreedIndex: number;
}

interface MockTrendingCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
  rank: number;
}

interface MockNewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  sourceUrl: string;
  source: string;
  category:
    | "bitcoin"
    | "ethereum"
    | "defi"
    | "nft"
    | "regulation"
    | "market"
    | "technology";
  readTime: number;
  tags: string[];
}

interface MockPortfolio {
  id: string;
  name: string;
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
  holdings: Array<{
    coinId: string;
    symbol: string;
    name: string;
    amount: number;
    currentValue: number;
    allocation: number;
    priceChange24h: number;
  }>;
}

interface HomePageClientProps {
  marketStats: MockMarketStats;
  trendingCoins: MockTrendingCoin[];
  newsArticles: MockNewsArticle[];
  portfolio: MockPortfolio;
}

export function HomePageClient({
  marketStats,
  trendingCoins,
  newsArticles,
  portfolio,
}: HomePageClientProps) {
  const handleAddToWatchlist = (coinId: string) => {
    console.log("Add to watchlist:", coinId);
    // Implement add to watchlist functionality
  };

  const handleAddToPortfolio = (coinId: string) => {
    console.log("Add to portfolio:", coinId);
    // Implement add to portfolio functionality
  };

  return (
    <>
      {/* Market Overview Section */}
      <section className="mb-6">
        <MarketOverview stats={marketStats} />
      </section>

      {/* Hero Section with Trending & Hot Lists */}
      <section className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-coingecko-green-500" />
                🔥 Trending
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-xs text-muted-foreground"
                >
                  View more
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Bitcoin", symbol: "BTC", change: 2.4 },
                  { name: "Toncoin", symbol: "TON", change: 2.6 },
                  { name: "Manyu", symbol: "MANYU", change: 63.3 },
                ].map((coin, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-4 text-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {coin.symbol}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs text-coingecko-green-500 border-coingecko-green-500"
                    >
                      +{coin.change}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />⭐ Hot
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-xs text-muted-foreground"
                >
                  View more
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Sui", symbol: "SUI", change: 8.9 },
                  { name: "Avalanche", symbol: "AVAX", change: 5.2 },
                  { name: "Fantom", symbol: "FTM", change: 12.1 },
                ].map((coin, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-4 text-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {coin.symbol}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs text-coingecko-green-500 border-coingecko-green-500"
                    >
                      +{coin.change}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column - Trending Coins */}
        <div className="lg:col-span-1">
          <TrendingCoins
            coins={trendingCoins}
            onAddToWatchlist={handleAddToWatchlist}
            onAddToPortfolio={handleAddToPortfolio}
          />
        </div>

        {/* Right Column - Featured News + Portfolio + Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <FeaturedNews articles={newsArticles} />
          <PortfolioSummary portfolio={portfolio} />
          <QuickActions
            onAddTransaction={(data) => console.log("Add transaction:", data)}
            onCreateAlert={(data) => console.log("Create alert:", data)}
            onAddToWatchlist={(coinId) =>
              console.log("Add to watchlist:", coinId)
            }
          />
        </div>
      </div>

      {/* Cryptocurrency Prices by Market Cap */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">
              Cryptocurrency Prices by Market Cap
            </CardTitle>
            <p className="text-sm md:text-base text-muted-foreground">
              The global cryptocurrency market cap today is{" "}
              <span className="font-semibold">
                ${(marketStats.totalMarketCap / 1e12).toFixed(2)}T
              </span>
              , a{" "}
              <span
                className={`font-semibold ${
                  marketStats.marketCapChange24h >= 0
                    ? "text-coingecko-green-500"
                    : "text-red-500"
                }`}
              >
                {marketStats.marketCapChange24h >= 0 ? "+" : ""}
                {marketStats.marketCapChange24h}%
              </span>{" "}
              change in the last 24 hours.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-xs md:text-sm text-muted-foreground">
                    <th className="text-left py-3 px-2 md:px-4 min-w-[60px]">
                      #
                    </th>
                    <th className="text-left py-3 px-2 md:px-4 min-w-[140px]">
                      Coin
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 min-w-[80px]">
                      Price
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 min-w-[60px] hidden sm:table-cell">
                      1h
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 min-w-[60px]">
                      24h
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 min-w-[60px] hidden md:table-cell">
                      7d
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 min-w-[100px] hidden lg:table-cell">
                      24h Volume
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 min-w-[100px] hidden xl:table-cell">
                      Market Cap
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 min-w-[100px] hidden xl:table-cell">
                      Last 7 Days
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trendingCoins.map((coin) => (
                    <tr
                      key={coin.id}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <div className="flex items-center gap-1 md:gap-2">
                          <Star className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground hover:text-yellow-500 cursor-pointer" />
                          <span className="font-medium text-sm md:text-base">
                            {coin.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <Link
                          href={`/coin/${coin.id}`}
                          className="flex items-center gap-2 md:gap-3 hover:opacity-80"
                        >
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            width={20}
                            height={20}
                            className="md:w-6 md:h-6 rounded-full flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-sm md:text-base truncate">
                              {coin.name}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground uppercase">
                              {coin.symbol}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right font-medium text-sm md:text-base">
                        ${coin.currentPrice.toLocaleString()}
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right hidden sm:table-cell">
                        <Badge
                          variant={
                            coin.priceChangePercentage24h >= 0
                              ? "default"
                              : "destructive"
                          }
                          className={`text-xs ${
                            coin.priceChangePercentage24h >= 0
                              ? "bg-coingecko-green-500 hover:bg-coingecko-green-600 text-white"
                              : ""
                          }`}
                        >
                          {coin.priceChangePercentage24h >= 0 ? "+" : ""}
                          {(coin.priceChangePercentage24h * 0.3).toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right">
                        <Badge
                          variant={
                            coin.priceChangePercentage24h >= 0
                              ? "default"
                              : "destructive"
                          }
                          className={`text-xs ${
                            coin.priceChangePercentage24h >= 0
                              ? "bg-coingecko-green-500 hover:bg-coingecko-green-600 text-white"
                              : ""
                          }`}
                        >
                          {coin.priceChangePercentage24h >= 0 ? "+" : ""}
                          {coin.priceChangePercentage24h.toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right hidden md:table-cell">
                        <Badge
                          variant={
                            coin.priceChangePercentage24h >= 0
                              ? "default"
                              : "destructive"
                          }
                          className={`text-xs ${
                            coin.priceChangePercentage24h >= 0
                              ? "bg-coingecko-green-500 hover:bg-coingecko-green-600 text-white"
                              : ""
                          }`}
                        >
                          {coin.priceChangePercentage24h >= 0 ? "+" : ""}
                          {(coin.priceChangePercentage24h * 1.2).toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right font-medium text-xs md:text-sm hidden lg:table-cell">
                        ${(coin.volume24h / 1e9).toFixed(1)}B
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right font-medium text-xs md:text-sm hidden xl:table-cell">
                        ${(coin.marketCap / 1e12).toFixed(2)}T
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right hidden xl:table-cell">
                        <div className="w-16 md:w-20 h-6 md:h-8">
                          {/* Simple sparkline representation */}
                          <div className="flex items-end h-full gap-0.5 md:gap-1">
                            {coin.sparkline.map(
                              (point: number, index: number) => (
                                <div
                                  key={index}
                                  className={`flex-1 ${
                                    coin.priceChangePercentage24h >= 0
                                      ? "bg-coingecko-green-500"
                                      : "bg-red-500"
                                  } opacity-70`}
                                  style={{
                                    height: `${
                                      ((point - Math.min(...coin.sparkline)) /
                                        (Math.max(...coin.sparkline) -
                                          Math.min(...coin.sparkline))) *
                                      100
                                    }%`,
                                  }}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for additional dashboard widgets */}
        <div className="h-64 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground font-medium">
              DeFi Protocols Widget
            </p>
            <p className="text-sm text-muted-foreground/70">Coming Soon</p>
          </div>
        </div>
        <div className="h-64 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground font-medium">
              NFT Collections Widget
            </p>
            <p className="text-sm text-muted-foreground/70">Coming Soon</p>
          </div>
        </div>
        <div className="h-64 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground font-medium">
              Price Alerts Widget
            </p>
            <p className="text-sm text-muted-foreground/70">Coming Soon</p>
          </div>
        </div>
      </div>
    </>
  );
}
