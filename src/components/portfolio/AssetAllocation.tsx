"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PortfolioHolding {
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

interface AssetAllocationProps {
  holdings: PortfolioHolding[];
  totalValue: number;
  className?: string;
  variant?: "chart" | "list" | "both";
}

const COLORS = [
  "#22c55e", // CoinGecko green primary
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
  "#ec4899", // pink
  "#6b7280", // gray
];

export function AssetAllocation({
  holdings,
  totalValue,
  className,
  variant = "both",
}: AssetAllocationProps) {
  const chartData = useMemo(() => {
    return holdings
      .filter((holding) => holding.allocation > 1) // Only show holdings > 1%
      .map((holding, index) => ({
        ...holding,
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.allocation - a.allocation);
  }, [holdings]);

  const otherAllocation = useMemo(() => {
    const displayedAllocation = chartData.reduce(
      (sum, item) => sum + item.allocation,
      0
    );
    return Math.max(0, 100 - displayedAllocation);
  }, [chartData]);

  const formatValue = (value: number) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as PortfolioHolding & { color: string };
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="relative w-6 h-6">
              <Image
                src={data.image}
                alt={data.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="font-semibold">{data.name}</span>
          </div>
          <p className="text-sm">Value: {formatValue(data.value)}</p>
          <p className="text-sm">Allocation: {data.allocation.toFixed(2)}%</p>
          <p className="text-sm">
            Amount: {data.amount.toLocaleString()} {data.symbol.toUpperCase()}
          </p>
        </div>
      );
    }
    return null;
  };

  interface PieLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index?: number;
  }

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelProps) => {
    if (percent < 0.05) return null; // Don't show labels for slices < 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (holdings.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">No assets in portfolio</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add some cryptocurrencies to see your allocation
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <p className="text-sm text-muted-foreground">
          Portfolio value: {formatValue(totalValue)}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {(variant === "chart" || variant === "both") && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="allocation"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {(variant === "list" || variant === "both") && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Holdings Breakdown</h4>
            <div className="space-y-3">
              {holdings
                .sort((a, b) => b.allocation - a.allocation)
                .map((holding, index) => {
                  const isPositive = holding.priceChangePercentage24h >= 0;
                  const color = COLORS[index % COLORS.length];

                  return (
                    <div key={holding.coinId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <div className="relative w-6 h-6">
                            <Image
                              src={holding.image}
                              alt={holding.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm truncate">
                                {holding.name}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {holding.symbol.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {holding.amount.toLocaleString()} tokens
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-sm">
                            {formatValue(holding.value)}
                          </p>
                          <div
                            className={cn(
                              "text-xs",
                              isPositive
                                ? "text-coingecko-green-600"
                                : "text-red-600"
                            )}
                          >
                            {isPositive ? "+" : ""}
                            {holding.priceChangePercentage24h.toFixed(2)}%
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <p className="font-medium text-sm">
                            {holding.allocation.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <Progress
                        value={holding.allocation}
                        className="h-2"
                        style={
                          {
                            "--progress-background": color,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  );
                })}

              {otherAllocation > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                      <span className="font-medium text-sm text-muted-foreground">
                        Other ({holdings.length - chartData.length} assets)
                      </span>
                    </div>
                    <p className="font-medium text-sm">
                      {otherAllocation.toFixed(1)}%
                    </p>
                  </div>
                  <Progress value={otherAllocation} className="h-2" />
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
