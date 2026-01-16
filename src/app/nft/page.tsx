"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SearchBar } from "@/components/common/SearchBar";
import {
  Image as ImageIcon,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

interface NFTCollection {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  floorPrice: number;
  floorPriceChange24h: number;
  volume24h: number;
  volumeChange24h: number;
  totalSupply: number;
  holders: number;
  listedCount: number;
  listedPercentage: number;
  createdDate: string;
  verified: boolean;
  marketplace: string[];
  traits: number;
}

interface TrendingNFT {
  id: string;
  name: string;
  image: string;
  collectionName: string;
  price: number;
  priceChange24h: number;
  rank: number;
}

// Mock NFT data
const mockCollections: NFTCollection[] = [
  {
    id: "bored-ape-yacht-club",
    name: "Bored Ape Yacht Club",
    slug: "boredapeyachtclub",
    image: "/api/placeholder/100/100",
    description:
      "A collection of 10,000 unique Bored Ape NFTs living on the Ethereum blockchain.",
    floorPrice: 15.5,
    floorPriceChange24h: -2.3,
    volume24h: 892.4,
    volumeChange24h: 12.8,
    totalSupply: 10000,
    holders: 5643,
    listedCount: 1234,
    listedPercentage: 12.34,
    createdDate: "2021-04-30",
    verified: true,
    marketplace: ["OpenSea", "LooksRare", "X2Y2"],
    traits: 170,
  },
  {
    id: "cryptopunks",
    name: "CryptoPunks",
    slug: "cryptopunks",
    image: "/api/placeholder/100/100",
    description:
      "10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.",
    floorPrice: 45.2,
    floorPriceChange24h: 5.7,
    volume24h: 1245.8,
    volumeChange24h: -8.2,
    totalSupply: 10000,
    holders: 3482,
    listedCount: 234,
    listedPercentage: 2.34,
    createdDate: "2017-06-23",
    verified: true,
    marketplace: ["OpenSea", "LooksRare"],
    traits: 87,
  },
  {
    id: "azuki",
    name: "Azuki",
    slug: "azuki",
    image: "/api/placeholder/100/100",
    description:
      "A collection of 10,000 avatars that give you membership access to The Garden.",
    floorPrice: 8.9,
    floorPriceChange24h: 1.2,
    volume24h: 567.3,
    volumeChange24h: 23.4,
    totalSupply: 10000,
    holders: 4892,
    listedCount: 789,
    listedPercentage: 7.89,
    createdDate: "2022-01-12",
    verified: true,
    marketplace: ["OpenSea", "Blur"],
    traits: 145,
  },
];

const mockTrending: TrendingNFT[] = [
  {
    id: "1",
    name: "Bored Ape #1234",
    image: "/api/placeholder/80/80",
    collectionName: "Bored Ape Yacht Club",
    price: 18.5,
    priceChange24h: 12.3,
    rank: 1,
  },
  {
    id: "2",
    name: "CryptoPunk #5678",
    image: "/api/placeholder/80/80",
    collectionName: "CryptoPunks",
    price: 52.1,
    priceChange24h: -5.2,
    rank: 2,
  },
];

export default function NFTPage() {
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [trending, setTrending] = useState<TrendingNFT[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<
    NFTCollection[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("volume24h");
  const [timeframe, setTimeframe] = useState("24h");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCollections(mockCollections);
      setTrending(mockTrending);
      setFilteredCollections(mockCollections);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = collections;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (collection) =>
          collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collection.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "volume24h":
          return b.volume24h - a.volume24h;
        case "floorPrice":
          return b.floorPrice - a.floorPrice;
        case "holders":
          return b.holders - a.holders;
        case "totalSupply":
          return b.totalSupply - a.totalSupply;
        default:
          return 0;
      }
    });

    setFilteredCollections(filtered);
  }, [collections, searchQuery, sortBy]);

  const formatPrice = (price: number) => `${price.toFixed(2)} ETH`;
  const formatVolume = (volume: number) => `${volume.toFixed(1)} ETH`;
  const formatNumber = (num: number) => num.toLocaleString();

  const totalVolume = collections.reduce((sum, col) => sum + col.volume24h, 0);
  const totalHolders = collections.reduce((sum, col) => sum + col.holders, 0);

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
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />{" "}
          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold">NFT Collections</h1>
                  <p className="text-muted-foreground">
                    Explore and analyze the top NFT collections
                  </p>
                </div>
              </div>

              {/* Market Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Volume (24h)
                        </p>
                        <p className="text-2xl font-bold">
                          {formatVolume(totalVolume)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Holders
                        </p>
                        <p className="text-2xl font-bold">
                          {formatNumber(totalHolders)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Active Collections
                        </p>
                        <p className="text-2xl font-bold">
                          {collections.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Avg Floor Price
                        </p>
                        <p className="text-2xl font-bold">
                          {formatPrice(
                            collections.reduce(
                              (sum, c) => sum + c.floorPrice,
                              0
                            ) / collections.length
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="collections" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="collections">Collections</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>

              <TabsContent value="collections" className="space-y-6">
                {/* Filters and Search */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <SearchBar
                        placeholder="Search collections..."
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
                        <option value="volume24h">Sort by Volume</option>
                        <option value="floorPrice">Sort by Floor Price</option>
                        <option value="holders">Sort by Holders</option>
                        <option value="totalSupply">Sort by Supply</option>
                      </select>

                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="px-3 py-2 border border-border rounded-md bg-background"
                      >
                        <option value="24h">24h</option>
                        <option value="7d">7d</option>
                        <option value="30d">30d</option>
                        <option value="all">All Time</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCollections.map((collection) => (
                    <Card
                      key={collection.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                    >
                      <div className="relative">
                        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-gray-400" />
                        </div>
                        {collection.verified && (
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            Verified
                          </Badge>
                        )}
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {collection.name}
                          </CardTitle>
                          <div className="flex space-x-1">
                            {collection.marketplace
                              .slice(0, 2)
                              .map((marketplace) => (
                                <Badge
                                  key={marketplace}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {marketplace}
                                </Badge>
                              ))}
                          </div>
                        </div>
                        <CardDescription className="text-sm line-clamp-2">
                          {collection.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Floor Price
                            </p>
                            <div className="flex items-center space-x-1">
                              <p className="font-semibold">
                                {formatPrice(collection.floorPrice)}
                              </p>
                              <div
                                className={`flex items-center ${
                                  collection.floorPriceChange24h >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {collection.floorPriceChange24h >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3" />
                                )}
                                <span className="text-xs">
                                  {Math.abs(collection.floorPriceChange24h)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Volume (24h)
                            </p>
                            <div className="flex items-center space-x-1">
                              <p className="font-semibold">
                                {formatVolume(collection.volume24h)}
                              </p>
                              <div
                                className={`flex items-center ${
                                  collection.volumeChange24h >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {collection.volumeChange24h >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3" />
                                )}
                                <span className="text-xs">
                                  {Math.abs(collection.volumeChange24h)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Holders
                            </p>
                            <p className="font-semibold">
                              {formatNumber(collection.holders)}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Supply
                            </p>
                            <p className="font-semibold">
                              {formatNumber(collection.totalSupply)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Listed:{" "}
                            </span>
                            <span className="font-medium">
                              {collection.listedPercentage}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Traits:{" "}
                            </span>
                            <span className="font-medium">
                              {collection.traits}
                            </span>
                          </div>
                        </div>

                        <Button className="w-full" variant="outline">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Collection
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trending.map((nft) => (
                    <Card
                      key={nft.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <Badge className="absolute -top-1 -left-1 text-xs">
                              #{nft.rank}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{nft.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {nft.collectionName}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="font-semibold">
                                {formatPrice(nft.price)}
                              </span>
                              <div
                                className={`flex items-center ${
                                  nft.priceChange24h >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {nft.priceChange24h >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3" />
                                )}
                                <span className="text-xs">
                                  {Math.abs(nft.priceChange24h)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {filteredCollections.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No collections found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
