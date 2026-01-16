"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SearchBar } from "@/components/common/SearchBar";
import {
  Plus,
  Star,
  Trash2,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Share,
  Bell,
  BellOff,
  Eye,
  Settings,
  Download,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WatchlistCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
  market_cap_rank: number;
  volume_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  alerts_enabled: boolean;
}

interface Watchlist {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  coins: WatchlistCoin[];
  createdAt: string;
  isPublic: boolean;
  alerts_enabled: boolean;
}

// Mock watchlist data
const mockWatchlists: Watchlist[] = [
  {
    id: "1",
    name: "Main Portfolio",
    description: "My primary cryptocurrency investments",
    isDefault: true,
    isPublic: false,
    alerts_enabled: true,
    createdAt: "2024-01-01T00:00:00Z",
    coins: [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image:
          "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 43250.45,
        price_change_percentage_24h: 2.45,
        price_change_percentage_7d: 8.32,
        market_cap: 847920000000,
        market_cap_rank: 1,
        volume_24h: 24500000000,
        circulating_supply: 19600000,
        total_supply: 19600000,
        max_supply: 21000000,
        ath: 69045,
        ath_change_percentage: -37.36,
        ath_date: "2021-11-10T14:24:11.849Z",
        atl: 67.81,
        atl_change_percentage: 63656.8,
        atl_date: "2013-07-06T00:00:00.000Z",
        last_updated: "2024-01-15T10:30:00Z",
        alerts_enabled: true,
      },
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        image:
          "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: 2580.75,
        price_change_percentage_24h: -1.23,
        price_change_percentage_7d: 5.67,
        market_cap: 310450000000,
        market_cap_rank: 2,
        volume_24h: 12800000000,
        circulating_supply: 120280000,
        total_supply: 120280000,
        ath: 4878.26,
        ath_change_percentage: -47.08,
        ath_date: "2021-11-10T14:24:19.604Z",
        atl: 0.432979,
        atl_change_percentage: 595893.9,
        atl_date: "2015-10-20T00:00:00.000Z",
        last_updated: "2024-01-15T10:30:00Z",
        alerts_enabled: true,
      },
    ],
  },
  {
    id: "2",
    name: "DeFi Tokens",
    description: "Decentralized Finance tokens to watch",
    isDefault: false,
    isPublic: true,
    alerts_enabled: false,
    createdAt: "2024-01-05T00:00:00Z",
    coins: [],
  },
];

export default function WatchlistPageClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [newWatchlistDescription, setNewWatchlistDescription] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_rank");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWatchlists(mockWatchlists);
      setSelectedWatchlist(mockWatchlists[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const createWatchlist = () => {
    if (!newWatchlistName.trim()) return;

    const newWatchlist: Watchlist = {
      id: Date.now().toString(),
      name: newWatchlistName,
      description: newWatchlistDescription,
      isDefault: false,
      isPublic: false,
      alerts_enabled: false,
      coins: [],
      createdAt: new Date().toISOString(),
    };

    setWatchlists([...watchlists, newWatchlist]);
    setNewWatchlistName("");
    setNewWatchlistDescription("");
    setShowCreateDialog(false);
  };

  //   const deleteWatchlist = (id: string) => {
  //     const watchlist = watchlists.find((w) => w.id === id);
  //     if (watchlist?.isDefault) return; // Can't delete default watchlist

  //     setWatchlists(watchlists.filter((w) => w.id !== id));
  //     if (selectedWatchlist?.id === id) {
  //       setSelectedWatchlist(
  //         watchlists.find((w) => w.isDefault) || watchlists[0]
  //       );
  //     }
  //   };

  const removeCoinFromWatchlist = (coinId: string) => {
    if (!selectedWatchlist) return;

    const updatedWatchlist = {
      ...selectedWatchlist,
      coins: selectedWatchlist.coins.filter((coin) => coin.id !== coinId),
    };

    setSelectedWatchlist(updatedWatchlist);
    setWatchlists(
      watchlists.map((w) =>
        w.id === updatedWatchlist.id ? updatedWatchlist : w
      )
    );
  };

  const toggleAlerts = (coinId: string) => {
    if (!selectedWatchlist) return;

    const updatedWatchlist = {
      ...selectedWatchlist,
      coins: selectedWatchlist.coins.map((coin) =>
        coin.id === coinId
          ? { ...coin, alerts_enabled: !coin.alerts_enabled }
          : coin
      ),
    };

    setSelectedWatchlist(updatedWatchlist);
    setWatchlists(
      watchlists.map((w) =>
        w.id === updatedWatchlist.id ? updatedWatchlist : w
      )
    );
  };

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 10) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background container mx-auto px-4">
        <Header
          variant="simplified"
          isMobileMenuOpen={sidebarOpen}
          setIsMobileMenuOpen={setSidebarOpen}
        />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 min-w-0">
            <div className="container mx-auto px-4 py-5">
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const totalValue =
    selectedWatchlist?.coins.reduce(
      (sum, coin) => sum + coin.current_price,
      0
    ) || 0;
  const avgChange24h = selectedWatchlist?.coins.length
    ? selectedWatchlist.coins.reduce(
        (sum, coin) => sum + coin.price_change_percentage_24h,
        0
      ) / selectedWatchlist.coins.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="simplified"
        isMobileMenuOpen={sidebarOpen}
        setIsMobileMenuOpen={setSidebarOpen}
      />
      <div className="flex container mx-auto px-4">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          <div className="container mx-auto px-4 py-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold flex items-center gap-2">
                    <Star className="h-8 w-8 text-yellow-500" />
                    Watchlists
                  </h1>
                  <p className="text-muted-foreground">
                    Track your favorite cryptocurrencies and create custom lists
                  </p>
                </div>
                <Dialog
                  open={showCreateDialog}
                  onOpenChange={setShowCreateDialog}
                >
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Watchlist
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Watchlist</DialogTitle>
                      <DialogDescription>
                        Create a custom watchlist to track specific
                        cryptocurrencies
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Watchlist Name</Label>
                        <Input
                          id="name"
                          value={newWatchlistName}
                          onChange={(e) => setNewWatchlistName(e.target.value)}
                          placeholder="Enter watchlist name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">
                          Description (Optional)
                        </Label>
                        <Input
                          id="description"
                          value={newWatchlistDescription}
                          onChange={(e) =>
                            setNewWatchlistDescription(e.target.value)
                          }
                          placeholder="Describe your watchlist"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={createWatchlist} className="flex-1">
                          Create
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowCreateDialog(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Watchlist Tabs */}
              <div className="flex flex-wrap gap-2">
                {watchlists.map((watchlist) => (
                  <Button
                    key={watchlist.id}
                    variant={
                      selectedWatchlist?.id === watchlist.id
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setSelectedWatchlist(watchlist)}
                    className="relative"
                  >
                    {watchlist.name}
                    {watchlist.isDefault && (
                      <Star className="ml-2 h-3 w-3 fill-current" />
                    )}
                    <Badge variant="secondary" className="ml-2">
                      {watchlist.coins.length}
                    </Badge>
                  </Button>
                ))}
              </div>

              {selectedWatchlist && (
                <>
                  {/* Watchlist Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Star className="h-6 w-6 text-yellow-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Coins
                            </p>
                            <p className="text-2xl font-bold">
                              {selectedWatchlist.coins.length}
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
                              Combined Value
                            </p>
                            <p className="text-2xl font-bold">
                              {formatPrice(totalValue)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          {avgChange24h >= 0 ? (
                            <TrendingUp className="h-6 w-6 text-green-500" />
                          ) : (
                            <TrendingDown className="h-6 w-6 text-red-500" />
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Avg 24h Change
                            </p>
                            <p
                              className={`text-2xl font-bold ${
                                avgChange24h >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {avgChange24h.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <SearchBar
                        placeholder="Search coins in watchlist..."
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
                        <option value="market_cap_rank">Rank</option>
                        <option value="current_price">Price</option>
                        <option value="price_change_percentage_24h">
                          24h Change
                        </option>
                        <option value="market_cap">Market Cap</option>
                        <option value="volume_24h">Volume</option>
                      </select>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>

                  {/* Coins Table */}
                  {selectedWatchlist.coins.length > 0 ? (
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="h-12 px-4 text-left align-middle font-medium">
                                #
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium">
                                Name
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium">
                                Price
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium">
                                24h
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium">
                                7d
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium">
                                Market Cap
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium">
                                Volume
                              </th>
                              <th className="h-12 px-4 text-center align-middle font-medium">
                                Alerts
                              </th>
                              <th className="h-12 px-4 text-center align-middle font-medium">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedWatchlist.coins
                              .filter(
                                (coin) =>
                                  coin.name
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  coin.symbol
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                              )
                              .map((coin) => (
                                <tr
                                  key={coin.id}
                                  className="border-b hover:bg-muted/50"
                                >
                                  <td className="h-12 px-4 align-middle">
                                    <span className="font-medium">
                                      {coin.market_cap_rank}
                                    </span>
                                  </td>
                                  <td className="h-12 px-4 align-middle">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">
                                          {coin.symbol
                                            .toUpperCase()
                                            .slice(0, 2)}
                                        </span>
                                      </div>
                                      <div>
                                        <p className="font-medium">
                                          {coin.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {coin.symbol.toUpperCase()}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="h-12 px-4 align-middle text-right">
                                    <span className="font-medium">
                                      {formatPrice(coin.current_price)}
                                    </span>
                                  </td>
                                  <td className="h-12 px-4 align-middle text-right">
                                    <span
                                      className={`font-medium ${
                                        coin.price_change_percentage_24h >= 0
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {coin.price_change_percentage_24h.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  </td>
                                  <td className="h-12 px-4 align-middle text-right">
                                    <span
                                      className={`font-medium ${
                                        coin.price_change_percentage_7d >= 0
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {coin.price_change_percentage_7d.toFixed(
                                        2
                                      )}
                                      %
                                    </span>
                                  </td>
                                  <td className="h-12 px-4 align-middle text-right">
                                    <span className="font-medium">
                                      {formatMarketCap(coin.market_cap)}
                                    </span>
                                  </td>
                                  <td className="h-12 px-4 align-middle text-right">
                                    <span className="font-medium">
                                      {formatVolume(coin.volume_24h)}
                                    </span>
                                  </td>
                                  <td className="h-12 px-4 align-middle text-center">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleAlerts(coin.id)}
                                    >
                                      {coin.alerts_enabled ? (
                                        <Bell className="h-4 w-4 text-blue-500" />
                                      ) : (
                                        <BellOff className="h-4 w-4 text-gray-400" />
                                      )}
                                    </Button>
                                  </td>
                                  <td className="h-12 px-4 align-middle text-center">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Settings className="mr-2 h-4 w-4" />
                                          Set Alert
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Share className="mr-2 h-4 w-4" />
                                          Share
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            removeCoinFromWatchlist(coin.id)
                                          }
                                          className="text-red-600"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Remove
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Star className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          No coins in this watchlist
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Add some cryptocurrencies to start tracking their
                          performance
                        </p>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Coins
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
