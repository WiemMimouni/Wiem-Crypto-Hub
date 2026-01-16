"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Star,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CoinData } from "@/types/market";

// Table components matching CoinGecko's style
const Table = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("w-full overflow-x-auto", className)}>
    <table className="w-full table-auto">{children}</table>
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="border-b">{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

const TableHead = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <th
    className={cn(
      "text-left p-3 font-medium text-sm text-muted-foreground",
      className
    )}
    onClick={onClick}
  >
    {children}
  </th>
);

const TableRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <tr
    className={cn(
      "border-b border-border/50 hover:bg-muted/50 transition-colors",
      className
    )}
  >
    {children}
  </tr>
);

const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <td className={cn("p-3 text-sm", className)}>{children}</td>;

interface MarketTableProps {
  coins: CoinData[];
  loading?: boolean;
  className?: string;
  showPagination?: boolean;
  itemsPerPage?: number;
}

type SortField =
  | "marketCapRank"
  | "name"
  | "currentPrice"
  | "priceChangePercentage24h"
  | "marketCap"
  | "totalVolume";
type SortDirection = "asc" | "desc";

export function MarketTable({
  coins,
  loading = false,
  className,
  showPagination = true,
  itemsPerPage = 50,
}: MarketTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("marketCapRank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  const filteredAndSortedCoins = useMemo(() => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [coins, searchQuery, sortField, sortDirection]);

  const paginatedCoins = useMemo(() => {
    if (!showPagination) return filteredAndSortedCoins;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCoins.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCoins, currentPage, itemsPerPage, showPagination]);

  const totalPages = Math.ceil(filteredAndSortedCoins.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleWatchlist = (coinId: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(coinId)) {
      newWatchlist.delete(coinId);
    } else {
      newWatchlist.add(coinId);
    }
    setWatchlist(newWatchlist);
  };

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        {children}
        <ArrowUpDown className="w-3 h-3 opacity-50" />
      </div>
    </TableHead>
  );

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Market Overview</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Top 100</DropdownMenuItem>
                <DropdownMenuItem>DeFi Tokens</DropdownMenuItem>
                <DropdownMenuItem>Meme Coins</DropdownMenuItem>
                <DropdownMenuItem>Layer 1</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"> </TableHead>
                <SortableHeader field="marketCapRank">#</SortableHeader>
                <SortableHeader field="name">Name</SortableHeader>
                <SortableHeader field="currentPrice">Price</SortableHeader>
                <SortableHeader field="priceChangePercentage24h">
                  24h %
                </SortableHeader>
                <SortableHeader field="marketCap">Market Cap</SortableHeader>
                <SortableHeader field="totalVolume">
                  Volume (24h)
                </SortableHeader>
                <TableHead>Supply</TableHead>
                <TableHead className="w-12"> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCoins.map((coin) => {
                const isPositive = coin.priceChangePercentage24h >= 0;
                const priceChangeColor = isPositive
                  ? "text-green-600"
                  : "text-red-600";
                const TrendIcon = isPositive ? TrendingUp : TrendingDown;
                const isInWatchlist = watchlist.has(coin.id);

                return (
                  <TableRow key={coin.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWatchlist(coin.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Star
                          className={cn(
                            "w-4 h-4",
                            isInWatchlist
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        />
                      </Button>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium">{coin.marketCapRank}</span>
                    </TableCell>

                    <TableCell>
                      <Link
                        href={`/coin/${coin.id}`}
                        className="flex items-center space-x-3 hover:underline"
                      >
                        <div className="relative w-8 h-8">
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{coin.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {coin.symbol.toUpperCase()}
                          </div>
                        </div>
                      </Link>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium">
                        {formatPrice(coin.currentPrice)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div
                        className={cn(
                          "flex items-center space-x-1",
                          priceChangeColor
                        )}
                      >
                        <TrendIcon className="w-3 h-3" />
                        <span className="font-medium">
                          {isPositive ? "+" : ""}
                          {coin.priceChangePercentage24h.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium">
                        {formatMarketCap(coin.marketCap)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium">
                        {formatMarketCap(coin.totalVolume)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">
                          {coin.circulatingSupply.toLocaleString()}
                        </div>
                        {coin.maxSupply && (
                          <div className="text-xs text-muted-foreground">
                            / {coin.maxSupply.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Add to Portfolio</DropdownMenuItem>
                          <DropdownMenuItem>Set Price Alert</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(
                currentPage * itemsPerPage,
                filteredAndSortedCoins.length
              )}{" "}
              of {filteredAndSortedCoins.length} coins
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
