"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { AssetAllocation } from "@/components/portfolio/AssetAllocation";
import { PerformanceChart } from "@/components/portfolio/PerformanceChart";
import { PortfolioForm } from "@/components/forms/PortfolioForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { withAuthRequired } from "@/components/common/withAuth";
import {
  Plus,
  Settings,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface MockPortfolio {
  id: string;
  name: string;
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
  weekChange: number;
  weekChangePercentage: number;
  monthChange: number;
  monthChangePercentage: number;
  allTimeHigh: number;
  allTimeLow: number;
  volatility: number;
  sharpeRatio: number;
}

interface MockHolding {
  coinId: string;
  symbol: string;
  name: string;
  image: string;
  amount: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  allocation: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
}

interface MockPerformanceData {
  timestamp: number;
  totalValue: number;
  totalCost: number;
  pnl: number;
  pnlPercentage: number;
}

interface PortfolioPageClientProps {
  portfolio: MockPortfolio;
  holdings: MockHolding[];
  performanceData: MockPerformanceData[];
  metrics: {
    totalValue: number;
    totalCost: number;
    totalPnL: number;
    totalPnLPercentage: number;
    dayChange: number;
    dayChangePercentage: number;
    weekChange: number;
    weekChangePercentage: number;
    monthChange: number;
    monthChangePercentage: number;
    allTimeHigh: number;
    allTimeLow: number;
    volatility: number;
    sharpeRatio: number;
  };
}

function PortfolioPageClientComponent({
  portfolio,
  holdings,
  performanceData,
  metrics,
}: PortfolioPageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formatValue = (value: number) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const isPositive = portfolio.totalPnL >= 0;

  const handleAddHolding = (data: Record<string, unknown>) => {
    console.log("Adding holding:", data);
    // In a real app, this would update the portfolio
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
                  <h1 className="text-3xl font-bold">{portfolio.name}</h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-3xl font-bold">
                      {formatValue(portfolio.totalValue)}
                    </span>
                    <div
                      className={`flex items-center space-x-1 ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                      <span className="font-semibold text-lg">
                        {isPositive ? "+" : ""}
                        {formatValue(portfolio.totalPnL)}
                      </span>
                      <span className="text-sm">
                        ({isPositive ? "+" : ""}
                        {portfolio.totalPnLPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    Total invested: {formatValue(portfolio.totalCost)}
                  </p>
                </div>

                <div className="flex items-center space-x-2 flex-wrap">
                  <PortfolioForm
                    onSubmit={handleAddHolding}
                    trigger={
                      <Button className="flex-shrink-0">
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Add Holding</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                    }
                  />
                  <Button variant="outline" className="flex-shrink-0">
                    <Settings className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Settings</span>
                  </Button>
                  <Button variant="outline" className="flex-shrink-0">
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      24h Change
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`flex items-center space-x-1 ${
                        portfolio.dayChange >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {portfolio.dayChange >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-xl font-bold">
                        {portfolio.dayChange >= 0 ? "+" : ""}
                        {formatValue(portfolio.dayChange)}
                      </span>
                      <span className="text-sm">
                        ({portfolio.dayChange >= 0 ? "+" : ""}
                        {portfolio.dayChangePercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      7d Change
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`flex items-center space-x-1 ${
                        portfolio.weekChange >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {portfolio.weekChange >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-xl font-bold">
                        {portfolio.weekChange >= 0 ? "+" : ""}
                        {formatValue(portfolio.weekChange)}
                      </span>
                      <span className="text-sm">
                        ({portfolio.weekChange >= 0 ? "+" : ""}
                        {portfolio.weekChangePercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      All-Time High
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <span className="text-xl font-bold">
                        {formatValue(portfolio.allTimeHigh)}
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        ATH
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Volatility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <span className="text-xl font-bold">
                        {portfolio.volatility.toFixed(1)}%
                      </span>
                      <Badge variant="outline" className="ml-2">
                        30d
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <div className="lg:col-span-2">
                  <PerformanceChart
                    data={performanceData}
                    metrics={metrics}
                    variant="value"
                    showMetrics={false}
                  />
                </div>

                {/* Asset Allocation */}
                <div className="lg:col-span-1">
                  <AssetAllocation
                    holdings={holdings}
                    totalValue={portfolio.totalValue}
                    variant="both"
                  />
                </div>
              </div>
              {/* Portfolio Summary */}
              <PortfolioSummary
                portfolio={{
                  totalValue: portfolio.totalValue,
                  totalCost: portfolio.totalCost,
                  totalPnL: portfolio.totalPnL,
                  totalPnLPercentage: portfolio.totalPnLPercentage,
                  dayChange: portfolio.dayChange,
                  dayChangePercentage: portfolio.dayChangePercentage,
                  holdings: holdings.map((holding) => ({
                    coinId: holding.coinId,
                    symbol: holding.symbol,
                    name: holding.name,
                    amount: holding.amount,
                    currentValue: holding.value,
                    allocation: holding.allocation,
                    priceChange24h: holding.priceChangePercentage24h,
                  })),
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication protection
export const PortfolioPageClient = withAuthRequired(
  PortfolioPageClientComponent
);
