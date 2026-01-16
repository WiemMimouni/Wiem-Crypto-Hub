"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  DollarSign,
  Percent,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PortfolioHolding {
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  currentValue: number;
  allocation: number;
  priceChange24h: number;
}

interface PortfolioSummaryData {
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
  holdings: PortfolioHolding[];
}

interface PortfolioSummaryProps {
  portfolio: PortfolioSummaryData;
  isLoading?: boolean;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  portfolio,
  isLoading = false,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-muted rounded animate-pulse" />
              <div className="h-16 bg-muted rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!portfolio || portfolio.holdings.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-500" />
            Portfolio
          </CardTitle>
          <Button size="sm" asChild>
            <Link href="/portfolio/add">Create Portfolio</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No Portfolio Yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Start tracking your crypto investments by creating your first
              portfolio.
            </p>
            <Button asChild>
              <Link href="/portfolio/add">Create Portfolio</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const topHoldings = portfolio.holdings
    .sort((a, b) => b.allocation - a.allocation)
    .slice(0, 4);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-green-500" />
          Portfolio
        </CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/portfolio">View Details</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Value */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold">
            {formatCurrency(portfolio.totalValue)}
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              {portfolio.totalPnL >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span
                className={`font-medium ${
                  portfolio.totalPnL >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(Math.abs(portfolio.totalPnL))}
              </span>
              <span
                className={`${
                  portfolio.totalPnLPercentage >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({formatPercentage(portfolio.totalPnLPercentage)})
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <DollarSign className="h-4 w-4" />
              <span>24h Change</span>
            </div>
            <div className="flex items-center space-x-1">
              {portfolio.dayChange >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  portfolio.dayChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(Math.abs(portfolio.dayChange))}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <Percent className="h-4 w-4" />
              <span>24h Change %</span>
            </div>
            <div className="flex items-center space-x-1">
              {portfolio.dayChangePercentage >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  portfolio.dayChangePercentage >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatPercentage(portfolio.dayChangePercentage)}
              </span>
            </div>
          </div>
        </div>

        {/* Top Holdings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Top Holdings</h4>
            <span className="text-xs text-muted-foreground">
              {portfolio.holdings.length} assets
            </span>
          </div>

          <div className="space-y-3">
            {topHoldings.map((holding) => (
              <div key={holding.coinId} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">
                      {holding.symbol.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground">
                      {holding.name}
                    </span>
                  </div>
                  <div className="text-right space-x-2">
                    <span className="font-medium">
                      {formatCurrency(holding.currentValue)}
                    </span>
                    <span
                      className={`text-xs ${
                        holding.priceChange24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatPercentage(holding.priceChange24h)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {holding.amount.toLocaleString()}{" "}
                    {holding.symbol.toUpperCase()}
                  </span>
                  <span>{holding.allocation.toFixed(1)}%</span>
                </div>
                <Progress value={holding.allocation} className="h-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/portfolio/add">
              <BarChart3 className="h-4 w-4 mr-2" />
              Add Trade
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/portfolio">
              <Wallet className="h-4 w-4 mr-2" />
              View Full
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
