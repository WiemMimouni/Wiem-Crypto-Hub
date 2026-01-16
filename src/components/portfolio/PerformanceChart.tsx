"use client";

import { useState, useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceDataPoint {
  timestamp: number;
  totalValue: number;
  totalCost: number;
  pnl: number;
  pnlPercentage: number;
}

interface PerformanceMetrics {
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

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  metrics: PerformanceMetrics;
  className?: string;
  variant?: "value" | "pnl" | "percentage";
  showMetrics?: boolean;
}

const TIME_RANGES = [
  { label: "24H", value: "24h", days: 1 },
  { label: "7D", value: "7d", days: 7 },
  { label: "30D", value: "30d", days: 30 },
  { label: "90D", value: "90d", days: 90 },
  { label: "1Y", value: "1y", days: 365 },
  { label: "ALL", value: "all", days: null },
] as const;

export function PerformanceChart({
  data,
  metrics,
  className,
  variant = "value",
  showMetrics = true,
}: PerformanceChartProps) {
  const [selectedRange, setSelectedRange] = useState("30d");
  const [displayMode, setDisplayMode] = useState<"absolute" | "percentage">(
    "absolute"
  );

  const filteredData = useMemo(() => {
    if (selectedRange === "all") return data;

    const range = TIME_RANGES.find((r) => r.value === selectedRange);
    if (!range?.days) return data;

    const cutoffTime = Date.now() - range.days * 24 * 60 * 60 * 1000;
    return data.filter((point) => point.timestamp >= cutoffTime);
  }, [data, selectedRange]);

  const chartConfig = useMemo(() => {
    const isPositive = metrics.totalPnL >= 0;

    switch (variant) {
      case "pnl":
        return {
          dataKey: displayMode === "absolute" ? "pnl" : "pnlPercentage",
          color: isPositive ? "#22c55e" : "#ef4444",
          label: displayMode === "absolute" ? "P&L ($)" : "P&L (%)",
          formatter:
            displayMode === "absolute"
              ? (value: number) => `$${value.toLocaleString()}`
              : (value: number) => `${value.toFixed(2)}%`,
        };
      case "percentage":
        return {
          dataKey: "pnlPercentage",
          color: isPositive ? "#22c55e" : "#ef4444",
          label: "P&L (%)",
          formatter: (value: number) => `${value.toFixed(2)}%`,
        };
      default:
        return {
          dataKey: "totalValue",
          color: "#3b82f6",
          label: "Portfolio Value",
          formatter: (value: number) => `$${value.toLocaleString()}`,
        };
    }
  }, [variant, displayMode, metrics.totalPnL]);

  const formatValue = (value: number) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatXAxisLabel = (timestamp: number) => {
    const date = new Date(timestamp);

    if (selectedRange === "24h") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: PerformanceDataPoint;
      value: number;
      dataKey: string;
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(data.timestamp).toLocaleString()}
          </p>
          <div className="space-y-1">
            <p className="font-semibold">
              Value: {formatValue(data.totalValue)}
            </p>
            <p className="text-sm">Cost: {formatValue(data.totalCost)}</p>
            <p
              className={cn(
                "text-sm font-medium",
                data.pnl >= 0 ? "text-coingecko-green-600" : "text-red-600"
              )}
            >
              P&L: {data.pnl >= 0 ? "+" : ""}
              {formatValue(data.pnl)} ({data.pnlPercentage.toFixed(2)}%)
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const isPositive = metrics.totalPnL >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No performance data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>Portfolio Performance</span>
              {variant === "pnl" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDisplayMode((mode) =>
                      mode === "absolute" ? "percentage" : "absolute"
                    )
                  }
                  className="ml-2"
                >
                  {displayMode === "absolute" ? (
                    <DollarSign className="w-4 h-4" />
                  ) : (
                    <Percent className="w-4 h-4" />
                  )}
                </Button>
              )}
            </CardTitle>
            {showMetrics && (
              <div className="flex items-center space-x-4 mt-2">
                <div>
                  <p className="text-2xl font-bold">
                    {formatValue(metrics.totalValue)}
                  </p>
                  <p className="text-sm text-muted-foreground">Current Value</p>
                </div>
                <div
                  className={cn(
                    "flex items-center space-x-1",
                    isPositive ? "text-coingecko-green-600" : "text-red-600"
                  )}
                >
                  <TrendIcon className="w-4 h-4" />
                  <div>
                    <p className="font-semibold">
                      {isPositive ? "+" : ""}
                      {formatValue(metrics.totalPnL)}
                    </p>
                    <p className="text-sm">
                      {isPositive ? "+" : ""}
                      {metrics.totalPnLPercentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-1">
            {TIME_RANGES.map((range) => (
              <Button
                key={range.value}
                variant={selectedRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRange(range.value)}
                className="text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxisLabel}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={
                  variant === "percentage"
                    ? ["dataMin", "dataMax"]
                    : ["auto", "auto"]
                }
                tickFormatter={chartConfig.formatter}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />

              {variant === "pnl" && (
                <ReferenceLine y={0} stroke="#64748b" strokeDasharray="2 2" />
              )}

              <defs>
                <linearGradient
                  id="performanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={chartConfig.color}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.color}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey={chartConfig.dataKey}
                stroke={chartConfig.color}
                strokeWidth={2}
                fill="url(#performanceGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {showMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p
                className={cn(
                  "font-semibold",
                  metrics.dayChange >= 0
                    ? "text-coingecko-green-600"
                    : "text-red-600"
                )}
              >
                {metrics.dayChange >= 0 ? "+" : ""}
                {formatValue(metrics.dayChange)}
              </p>
              <p
                className={cn(
                  "text-xs",
                  metrics.dayChangePercentage >= 0
                    ? "text-coingecko-green-600"
                    : "text-red-600"
                )}
              >
                {metrics.dayChangePercentage >= 0 ? "+" : ""}
                {metrics.dayChangePercentage.toFixed(2)}%
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">7d Change</p>
              <p
                className={cn(
                  "font-semibold",
                  metrics.weekChange >= 0
                    ? "text-coingecko-green-600"
                    : "text-red-600"
                )}
              >
                {metrics.weekChange >= 0 ? "+" : ""}
                {formatValue(metrics.weekChange)}
              </p>
              <p
                className={cn(
                  "text-xs",
                  metrics.weekChangePercentage >= 0
                    ? "text-coingecko-green-600"
                    : "text-red-600"
                )}
              >
                {metrics.weekChangePercentage >= 0 ? "+" : ""}
                {metrics.weekChangePercentage.toFixed(2)}%
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">ATH</p>
              <p className="font-semibold">
                {formatValue(metrics.allTimeHigh)}
              </p>
              <Badge variant="secondary" className="text-xs mt-1">
                All Time High
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Volatility</p>
              <p className="font-semibold">{metrics.volatility.toFixed(2)}%</p>
              <Badge variant="outline" className="text-xs mt-1">
                30d
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
