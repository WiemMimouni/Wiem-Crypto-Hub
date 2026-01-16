"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  ExternalLink,
  Shield,
  Globe,
  Volume2,
} from "lucide-react";
import Image from "next/image";

// Mock exchange data
const exchanges = [
  {
    id: "binance",
    name: "Binance",
    logo: "https://coin-images.coingecko.com/markets/images/52/small/binance.jpg",
    trustScore: 10,
    volume24h: 76543219876,
    volumeChange24h: 2.3,
    country: "Malta",
    established: 2017,
    pairs: 2000,
    coins: 350,
    hasApi: true,
    website: "https://binance.com",
    description: "World's largest cryptocurrency exchange by trading volume",
  },
  {
    id: "coinbase",
    name: "Coinbase Exchange",
    logo: "https://coin-images.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png",
    trustScore: 10,
    volume24h: 12345678900,
    volumeChange24h: -1.5,
    country: "United States",
    established: 2012,
    pairs: 300,
    coins: 200,
    hasApi: true,
    website: "https://coinbase.com",
    description:
      "Leading US-based cryptocurrency exchange with strong regulatory compliance",
  },
  {
    id: "kraken",
    name: "Kraken",
    logo: "https://coin-images.coingecko.com/markets/images/29/small/kraken.jpg",
    trustScore: 9,
    volume24h: 8765432100,
    volumeChange24h: 0.8,
    country: "United States",
    established: 2011,
    pairs: 500,
    coins: 180,
    hasApi: true,
    website: "https://kraken.com",
    description:
      "Veteran cryptocurrency exchange known for security and reliability",
  },
  {
    id: "bybit",
    name: "Bybit",
    logo: "https://coin-images.coingecko.com/markets/images/698/small/bybit_logo.jpg",
    trustScore: 8,
    volume24h: 15432109876,
    volumeChange24h: 5.2,
    country: "Singapore",
    established: 2018,
    pairs: 800,
    coins: 120,
    hasApi: true,
    website: "https://bybit.com",
    description: "Popular derivatives exchange with advanced trading features",
  },
  {
    id: "okx",
    name: "OKX",
    logo: "https://coin-images.coingecko.com/markets/images/96/small/okex.jpg",
    trustScore: 9,
    volume24h: 9876543210,
    volumeChange24h: -2.1,
    country: "Seychelles",
    established: 2017,
    pairs: 600,
    coins: 300,
    hasApi: true,
    website: "https://okx.com",
    description:
      "Global cryptocurrency exchange with comprehensive trading options",
  },
  {
    id: "kucoin",
    name: "KuCoin",
    logo: "https://coin-images.coingecko.com/markets/images/61/small/kucoin.jpg",
    trustScore: 8,
    volume24h: 6543210987,
    volumeChange24h: 3.7,
    country: "Seychelles",
    established: 2017,
    pairs: 1200,
    coins: 400,
    hasApi: true,
    website: "https://kucoin.com",
    description:
      "Global exchange known for listing new and emerging cryptocurrencies",
  },
];

export default function ExchangesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  };

  const getTrustScoreBadge = (score: number) => {
    if (score >= 9)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (score >= 7)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

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
                  <h1 className="text-3xl font-bold">
                    Cryptocurrency Exchanges
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Compare and discover the best cryptocurrency exchanges
                    worldwide
                  </p>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search exchanges..." className="pl-10" />
                </div>
              </div>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Exchanges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">500+</div>
                    <p className="text-xs text-muted-foreground">
                      Tracked globally
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      24h Volume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$127.5B</div>
                    <p className="text-xs text-green-600">
                      +2.4% from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Trading Pairs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50K+</div>
                    <p className="text-xs text-muted-foreground">
                      Across all exchanges
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Countries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100+</div>
                    <p className="text-xs text-muted-foreground">
                      Global coverage
                    </p>
                  </CardContent>
                </Card>
              </div>
              {/* Exchanges List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Top Exchanges by Volume
                </h2>

                <div className="space-y-3">
                  {exchanges.map((exchange, index) => (
                    <Card
                      key={exchange.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Exchange Info */}
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-muted-foreground font-mono text-sm w-6">
                                #{index + 1}
                              </span>
                              <div className="relative w-10 h-10">
                                <Image
                                  src={exchange.logo}
                                  alt={exchange.name}
                                  fill
                                  className="rounded-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {exchange.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {exchange.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex flex-wrap gap-6 lg:gap-8">
                            {/* Trust Score */}
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Trust Score
                              </div>
                              <Badge
                                className={getTrustScoreBadge(
                                  exchange.trustScore
                                )}
                              >
                                {exchange.trustScore}/10
                              </Badge>
                            </div>

                            {/* Volume */}
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                24h Volume
                              </div>
                              <div className="font-semibold">
                                {formatVolume(exchange.volume24h)}
                              </div>
                              <div
                                className={`text-xs flex items-center justify-center ${
                                  exchange.volumeChange24h >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {exchange.volumeChange24h >= 0 ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {Math.abs(exchange.volumeChange24h)}%
                              </div>
                            </div>

                            {/* Pairs */}
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Pairs
                              </div>
                              <div className="font-semibold">
                                {exchange.pairs.toLocaleString()}
                              </div>
                            </div>

                            {/* Country */}
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Country
                              </div>
                              <div className="font-semibold text-sm">
                                {exchange.country}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Star className="w-4 h-4 mr-1" />
                                Watch
                              </Button>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Visit
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 pt-4 border-t border-muted flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            Established {exchange.established}
                          </div>
                          <div className="flex items-center">
                            <Volume2 className="w-4 h-4 mr-1" />
                            {exchange.coins} coins
                          </div>
                          {exchange.hasApi && (
                            <div className="flex items-center">
                              <Shield className="w-4 h-4 mr-1" />
                              API Available
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Exchanges
                </Button>
              </div>{" "}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
