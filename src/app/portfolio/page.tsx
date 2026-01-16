import { PortfolioPageClient } from "@/components/client/pages/PortfolioPageClient";

// Mock portfolio data
const mockPortfolio = {
  id: "default-portfolio",
  name: "My Portfolio",
  totalValue: 33553.575,
  totalCost: 31000,
  totalPnL: 2553.575,
  totalPnLPercentage: 8.24,
  dayChange: 680.23,
  dayChangePercentage: 2.07,
  weekChange: -234.56,
  weekChangePercentage: -0.69,
  monthChange: 1234.67,
  monthChangePercentage: 3.82,
  allTimeHigh: 35000,
  allTimeLow: 28000,
  volatility: 12.5,
  sharpeRatio: 1.2,
};

const mockHoldings = [
  {
    coinId: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    amount: 0.5,
    averagePrice: 40000,
    currentPrice: 43250.45,
    value: 21625.225,
    allocation: 64.4,
    priceChange24h: 1034.56,
    priceChangePercentage24h: 2.45,
  },
  {
    coinId: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    amount: 5,
    averagePrice: 2200,
    currentPrice: 2385.67,
    value: 11928.35,
    allocation: 35.5,
    priceChange24h: -29.87,
    priceChangePercentage24h: -1.23,
  },
];

const mockPerformanceData = Array.from({ length: 30 }, (_, i) => ({
  timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
  totalValue: 30000 + Math.sin(i / 5) * 2000 + Math.random() * 1000,
  totalCost: 31000,
  pnl: 0,
  pnlPercentage: 0,
})).map((point) => {
  point.pnl = point.totalValue - point.totalCost;
  point.pnlPercentage = (point.pnl / point.totalCost) * 100;
  return point;
});

const mockMetrics = {
  totalValue: mockPortfolio.totalValue,
  totalCost: mockPortfolio.totalCost,
  totalPnL: mockPortfolio.totalPnL,
  totalPnLPercentage: mockPortfolio.totalPnLPercentage,
  dayChange: mockPortfolio.dayChange,
  dayChangePercentage: mockPortfolio.dayChangePercentage,
  weekChange: mockPortfolio.weekChange,
  weekChangePercentage: mockPortfolio.weekChangePercentage,
  monthChange: mockPortfolio.monthChange,
  monthChangePercentage: mockPortfolio.monthChangePercentage,
  allTimeHigh: mockPortfolio.allTimeHigh,
  allTimeLow: mockPortfolio.allTimeLow,
  volatility: mockPortfolio.volatility,
  sharpeRatio: mockPortfolio.sharpeRatio,
};

export default function PortfolioPage() {
  return (
    <PortfolioPageClient
      portfolio={mockPortfolio}
      holdings={mockHoldings}
      performanceData={mockPerformanceData}
      metrics={mockMetrics}
    />
  );
}
