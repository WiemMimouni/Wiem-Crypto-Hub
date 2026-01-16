"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  activeCoins: number;
  marketCapChange24h: number;
  volumeChange24h: number;
  fearGreedIndex: number;
}

interface MarketOverviewProps {
  stats: MarketStats;
  isLoading?: boolean;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({
  stats,
  isLoading = false,
}) => {
  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-muted rounded animate-pulse w-32" />
          <div className="h-4 bg-muted rounded animate-pulse w-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Market Cap:</span>
          <span className="font-semibold text-coingecko-green-600">
            {formatCurrency(stats.totalMarketCap)}
          </span>
          <Badge
            variant={stats.marketCapChange24h >= 0 ? "default" : "destructive"}
            className={`text-xs ${
              stats.marketCapChange24h >= 0
                ? "bg-coingecko-green-500 hover:bg-coingecko-green-600"
                : ""
            }`}
          >
            {formatPercentage(stats.marketCapChange24h)}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">24h Vol:</span>
          <span className="font-semibold">
            {formatCurrency(stats.totalVolume24h)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Dominance:</span>
          <span className="font-semibold">
            <span className="text-orange-500">BTC {stats.btcDominance}%</span>
            <span className="text-muted-foreground mx-1">|</span>
            <span className="text-blue-500">ETH {stats.ethDominance}%</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Gas:</span>
          <span className="font-semibold">2.001 GWEI</span>
        </div>
      </div>
    </div>
  );
};
