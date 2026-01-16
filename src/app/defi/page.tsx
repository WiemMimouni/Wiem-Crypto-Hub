"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SearchBar } from "@/components/common/SearchBar";
import {
  DollarSign,
  Percent,
  Coins,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Lock,
} from "lucide-react";

interface DeFiProtocol {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  category: string;
  tvl: number;
  tvlChange24h: number;
  apy: number;
  users: number;
  description: string;
  chains: string[];
  website: string;
  risks: string[];
}

// Mock DeFi data
const mockProtocols: DeFiProtocol[] = [
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    logo: "/api/placeholder/32/32",
    category: "Lending",
    tvl: 6800000000,
    tvlChange24h: 2.5,
    apy: 4.2,
    users: 145000,
    description: "Decentralized lending and borrowing protocol",
    chains: ["Ethereum", "Polygon", "Avalanche"],
    website: "https://aave.com",
    risks: ["Smart Contract Risk", "Liquidation Risk"],
  },
  {
    id: "uniswap",
    name: "Uniswap V3",
    symbol: "UNI",
    logo: "/api/placeholder/32/32",
    category: "DEX",
    tvl: 3900000000,
    tvlChange24h: -1.2,
    apy: 15.8,
    users: 89000,
    description: "Decentralized exchange with concentrated liquidity",
    chains: ["Ethereum", "Polygon", "Arbitrum"],
    website: "https://uniswap.org",
    risks: ["Impermanent Loss", "Smart Contract Risk"],
  },
  {
    id: "compound",
    name: "Compound",
    symbol: "COMP",
    logo: "/api/placeholder/32/32",
    category: "Lending",
    tvl: 2100000000,
    tvlChange24h: 0.8,
    apy: 3.7,
    users: 67000,
    description: "Algorithmic money markets protocol",
    chains: ["Ethereum"],
    website: "https://compound.finance",
    risks: ["Smart Contract Risk", "Governance Risk"],
  },
];

const categories = [
  "All",
  "Lending",
  "DEX",
  "Yield Farming",
  "Derivatives",
  "Insurance",
];

export default function DeFiPage() {
  const [protocols, setProtocols] = useState<DeFiProtocol[]>([]);
  const [filteredProtocols, setFilteredProtocols] = useState<DeFiProtocol[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("tvl");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProtocols(mockProtocols);
      setFilteredProtocols(mockProtocols);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = protocols;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (protocol) => protocol.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (protocol) =>
          protocol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          protocol.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "tvl":
          return b.tvl - a.tvl;
        case "apy":
          return b.apy - a.apy;
        case "users":
          return b.users - a.users;
        default:
          return 0;
      }
    });

    setFilteredProtocols(filtered);
  }, [protocols, selectedCategory, searchQuery, sortBy]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${amount.toFixed(2)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const totalTVL = protocols.reduce((sum, protocol) => sum + protocol.tvl, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          variant="simplified"
          isMobileMenuOpen={sidebarOpen}
          setIsMobileMenuOpen={setSidebarOpen}
        />
        <div className="container mx-auto px-4">
          <div className="w-full max-w-[1536px] mx-auto flex">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <main className="flex-1 p-5">
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold">DeFi Protocols</h1>
                    <p className="text-muted-foreground">
                      Discover and analyze decentralized finance protocols
                    </p>
                  </div>
                </div>

                {/* Market Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total TVL
                          </p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(totalTVL)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-6 w-6 text-coingecko-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Active Protocols
                          </p>
                          <p className="text-2xl font-bold">
                            {protocols.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Percent className="h-6 w-6 text-purple-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Avg APY
                          </p>
                          <p className="text-2xl font-bold">
                            {(
                              protocols.reduce((sum, p) => sum + p.apy, 0) /
                              protocols.length
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Filters and Search */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <SearchBar
                      placeholder="Search protocols..."
                      value={searchQuery}
                      onChange={setSearchQuery}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="tvl">Sort by TVL</option>
                      <option value="apy">Sort by APY</option>
                      <option value="users">Sort by Users</option>
                    </select>
                  </div>
                </div>

                {/* Category Tabs */}
                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <TabsList className="grid w-full grid-cols-6">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Protocols Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProtocols.map((protocol) => (
                  <Card
                    key={protocol.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Coins className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {protocol.name}
                            </CardTitle>
                            <CardDescription>{protocol.symbol}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">{protocol.category}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {protocol.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">TVL</p>
                          <div className="flex items-center space-x-1">
                            <p className="font-semibold">
                              {formatCurrency(protocol.tvl)}
                            </p>
                            <div
                              className={`flex items-center ${
                                protocol.tvlChange24h >= 0
                                  ? "text-coingecko-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {protocol.tvlChange24h >= 0 ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              <span className="text-xs">
                                {Math.abs(protocol.tvlChange24h)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">APY</p>
                          <p className="font-semibold text-coingecko-green-500">
                            {protocol.apy}%
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Users</p>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <p className="font-semibold">
                              {formatNumber(protocol.users)}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Chains
                          </p>
                          <p className="font-semibold">
                            {protocol.chains.length}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Supported Chains
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {protocol.chains.map((chain) => (
                            <Badge
                              key={chain}
                              variant="outline"
                              className="text-xs"
                            >
                              {chain}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Risks</p>
                        <div className="flex flex-wrap gap-1">
                          {protocol.risks.map((risk) => (
                            <Badge
                              key={risk}
                              variant="destructive"
                              className="text-xs"
                            >
                              <Lock className="h-2 w-2 mr-1" />
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">View Protocol</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProtocols.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No protocols found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
