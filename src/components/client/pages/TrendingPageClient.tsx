"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Flame,
  Users,
  BarChart3,
  Star,
  ExternalLink,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";

interface TrendingCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  marketCapRank: number;
  totalVolume: number;
  circulatingSupply: number;
  sparkline: number[];
  trendRank: number;
  searchVolume24h: number;
}

interface TrendingStats {
  totalTrending: number;
  avgPriceChange: number;
  topGainer: {
    name: string;
    symbol: string;
    change: number;
  };
  totalSearchVolume: number;
  updatedAt: string;
}

interface TrendingPageClientProps {
  trendingCoins: TrendingCoin[];
  trendingStats: TrendingStats;
}

export function TrendingPageClient({
  trendingCoins,
  trendingStats,
}: TrendingPageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("trendRank");
  const [timeFilter, setTimeFilter] = useState("24h");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter and sort trending coins
  const filteredCoins = useMemo(() => {
    let filtered = trendingCoins;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category (for demo purposes, we'll simulate categories)
    if (categoryFilter !== "all") {
      filtered = filtered.filter((coin) => {
        switch (categoryFilter) {
          case "meme":
            return ["pepe", "shiba-inu", "dogecoin"].includes(coin.id);
          case "defi":
            return ["uniswap", "chainlink"].includes(coin.id);
          case "layer1":
            return ["avalanche-2", "polygon"].includes(coin.id);
          case "gaming":
            return ["the-sandbox"].includes(coin.id);
          case "layer2":
            return ["arbitrum"].includes(coin.id);
          default:
            return true;
        }
      });
    }

    // Sort by selected criteria
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "trendRank":
          return a.trendRank - b.trendRank;
        case "priceChange":
          return b.priceChangePercentage24h - a.priceChangePercentage24h;
        case "searchVolume":
          return b.searchVolume24h - a.searchVolume24h;
        case "marketCap":
          return b.marketCap - a.marketCap;
        case "volume":
          return b.totalVolume - a.totalVolume;
        default:
          return 0;
      }
    });

    return filtered;
  }, [trendingCoins, searchQuery, sortBy, categoryFilter]);

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(8)}`;
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
  };

  const formatSearchVolume = (volume: number) => {
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(0)}K`;
    return volume.toLocaleString();
  };

  const getTrendBadgeColor = (rank: number) => {
    if (rank <= 3)
      return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
    if (rank <= 10)
      return "bg-gradient-to-r from-orange-400 to-red-500 text-white";
    return "bg-gradient-to-r from-blue-400 to-purple-500 text-white";
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
          <main className="container flex-1 mx-autop-5 space-y-8">
            {/* Header Section */}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Trending
                      </p>
                      <p className="text-2xl font-bold">
                        {trendingStats.totalTrending}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Avg Price Change
                      </p>
                      <p className="text-2xl font-bold text-green-500">
                        +{trendingStats.avgPriceChange}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Search Volume
                      </p>
                      <p className="text-2xl font-bold">
                        {formatSearchVolume(trendingStats.totalSearchVolume)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Top Gainer
                      </p>
                      <p className="text-lg font-bold">
                        {trendingStats.topGainer.symbol} +
                        {trendingStats.topGainer.change}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search coins..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trendRank">Trend Rank</SelectItem>
                      <SelectItem value="priceChange">Price Change</SelectItem>
                      <SelectItem value="searchVolume">
                        Search Volume
                      </SelectItem>
                      <SelectItem value="marketCap">Market Cap</SelectItem>
                      <SelectItem value="volume">Volume</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="meme">Meme Coins</SelectItem>
                      <SelectItem value="defi">DeFi</SelectItem>
                      <SelectItem value="layer1">Layer 1</SelectItem>
                      <SelectItem value="layer2">Layer 2</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 Hour</SelectItem>
                      <SelectItem value="24h">24 Hours</SelectItem>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Trending Coins Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCoins.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                      {/* Header with rank and coin info */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={cn(
                              "text-xs font-bold",
                              getTrendBadgeColor(coin.trendRank)
                            )}
                          >
                            #{coin.trendRank}
                          </Badge>
                          <div className="relative">
                            <Image
                              src={coin.image}
                              alt={coin.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {coin.name}
                            </h3>
                            <p className="text-sm text-muted-foreground uppercase">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price and change */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">
                            {formatPrice(coin.currentPrice)}
                          </span>
                          <div
                            className={cn(
                              "flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium",
                              coin.priceChangePercentage24h >= 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            )}
                          >
                            {coin.priceChangePercentage24h >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span>
                              {coin.priceChangePercentage24h >= 0 ? "+" : ""}
                              {coin.priceChangePercentage24h.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {coin.priceChangePercentage24h >= 0 ? "+" : ""}
                          {formatPrice(coin.priceChange24h)} (24h)
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Market Cap
                          </span>
                          <span className="font-medium">
                            {formatLargeNumber(coin.marketCap)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            24h Volume
                          </span>
                          <span className="font-medium">
                            {formatLargeNumber(coin.totalVolume)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Search Volume
                          </span>
                          <span className="font-medium flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>
                              {formatSearchVolume(coin.searchVolume24h)}
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Market Rank
                          </span>
                          <span className="font-medium">
                            #{coin.marketCapRank}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Link href={`/coin/${coin.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                        <Button variant="default" size="sm" className="flex-1">
                          <Star className="mr-2 h-4 w-4" />
                          Add to Watchlist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No results message */}
            {filteredCoins.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No trending coins found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Load More (if needed) */}
            {filteredCoins.length > 0 && (
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Trending Coins
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
