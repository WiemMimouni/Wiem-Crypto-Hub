"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { MarketTable } from "@/components/market/MarketTable";
import { SearchBar } from "@/components/common/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MockCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  totalVolume: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
}

interface MockGlobalData {
  totalMarketCap: number;
  totalVolume: number;
  marketCapChange24h: number;
  bitcoinDominance: number;
  ethereumDominance: number;
  fearGreedIndex: {
    value: number;
    classification: string;
  };
}

interface MarketPageClientProps {
  coins: MockCoin[];
  globalData: MockGlobalData;
}

export function MarketPageClient({ coins, globalData }: MarketPageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const isMarketPositive = globalData.marketCapChange24h >= 0;

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="simplified"
        isMobileMenuOpen={sidebarOpen}
        setIsMobileMenuOpen={setSidebarOpen}
      />
      <div className="container mx-auto px-4">
        <div className="w-full max-w-[1536px] mx-auto flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-5">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Cryptocurrency Market</h1>
                  <p className="text-muted-foreground mt-1">
                    Track prices, market cap, and trading volume of top
                    cryptocurrencies
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/market/trending">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Flame className="h-4 w-4" />
                      Trending Coins
                    </Button>
                  </Link>
                  <div className="lg:w-96">
                    <SearchBar placeholder="Search cryptocurrencies..." />
                  </div>
                </div>
              </div>
              {/* Market Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Market Cap
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {formatLargeNumber(globalData.totalMarketCap)}
                      </span>
                      <div
                        className={`flex items-center space-x-1 ${
                          isMarketPositive
                            ? "text-coingecko-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {isMarketPositive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {isMarketPositive ? "+" : ""}
                          {globalData.marketCapChange24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      24h Volume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-2xl font-bold">
                      {formatLargeNumber(globalData.totalVolume)}
                    </span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      BTC Dominance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {globalData.bitcoinDominance}%
                      </span>
                      <Badge variant="secondary">
                        ETH {globalData.ethereumDominance}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Fear & Greed Index
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {globalData.fearGreedIndex.value}
                      </span>
                      <Badge
                        variant={
                          globalData.fearGreedIndex.value > 50
                            ? "default"
                            : "secondary"
                        }
                        className={
                          globalData.fearGreedIndex.value > 75
                            ? "bg-coingecko-green-100 text-coingecko-green-800 dark:bg-coingecko-green-900 dark:text-coingecko-green-200"
                            : globalData.fearGreedIndex.value > 50
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }
                      >
                        {globalData.fearGreedIndex.classification}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Market Table */}
              <MarketTable
                coins={coins}
                loading={false}
                showPagination={true}
                itemsPerPage={10}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
