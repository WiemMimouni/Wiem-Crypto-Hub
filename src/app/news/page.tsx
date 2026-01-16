"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SearchBar } from "@/components/common/SearchBar";
import {
  Clock,
  TrendingUp,
  Share,
  BookOpen,
  ExternalLink,
  User,
  Eye,
  Heart,
  Bookmark,
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  category: string;
  tags: string[];
  readTime: number;
  sentiment: "positive" | "negative" | "neutral";
  views: number;
  likes: number;
  isBookmarked: boolean;
}

interface MarketSentiment {
  fearGreedIndex: number;
  sentiment: "Extreme Fear" | "Fear" | "Neutral" | "Greed" | "Extreme Greed";
  change24h: number;
}

// Mock news data
const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
    description:
      "Major corporations continue to add Bitcoin to their treasury reserves as regulatory clarity improves.",
    content: "Lorem ipsum dolor sit amet...",
    url: "https://example.com/bitcoin-ath",
    urlToImage: "/api/placeholder/300/200",
    publishedAt: "2024-01-15T10:30:00Z",
    source: {
      id: "crypto-news",
      name: "Crypto News Today",
    },
    author: "John Smith",
    category: "Bitcoin",
    tags: ["Bitcoin", "ATH", "Institutional", "Adoption"],
    readTime: 3,
    sentiment: "positive",
    views: 15420,
    likes: 234,
    isBookmarked: false,
  },
  {
    id: "2",
    title: "Ethereum 2.0 Staking Rewards Reach Historic Levels",
    description:
      "The Ethereum network sees record-high staking participation as rewards increase.",
    content: "Lorem ipsum dolor sit amet...",
    url: "https://example.com/eth-staking",
    urlToImage: "/api/placeholder/300/200",
    publishedAt: "2024-01-15T08:15:00Z",
    source: {
      id: "defi-pulse",
      name: "DeFi Pulse",
    },
    author: "Sarah Johnson",
    category: "Ethereum",
    tags: ["Ethereum", "Staking", "ETH2", "Rewards"],
    readTime: 5,
    sentiment: "positive",
    views: 12890,
    likes: 189,
    isBookmarked: true,
  },
  {
    id: "3",
    title: "Regulatory Concerns Impact Altcoin Market",
    description:
      "Recent regulatory announcements cause volatility in the altcoin market.",
    content: "Lorem ipsum dolor sit amet...",
    url: "https://example.com/altcoin-regulation",
    urlToImage: "/api/placeholder/300/200",
    publishedAt: "2024-01-14T16:45:00Z",
    source: {
      id: "regulatory-watch",
      name: "Regulatory Watch",
    },
    author: "Mike Chen",
    category: "Regulation",
    tags: ["Regulation", "Altcoins", "Volatility", "Market"],
    readTime: 4,
    sentiment: "negative",
    views: 8750,
    likes: 95,
    isBookmarked: false,
  },
];

const mockSentiment: MarketSentiment = {
  fearGreedIndex: 72,
  sentiment: "Greed",
  change24h: 8,
};

const categories = [
  "All",
  "Bitcoin",
  "Ethereum",
  "DeFi",
  "NFT",
  "Regulation",
  "Analysis",
  "Technology",
];
const sources = [
  "All Sources",
  "Crypto News Today",
  "DeFi Pulse",
  "Regulatory Watch",
  "BlockChain Tribune",
];

export default function NewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [sentiment] = useState<MarketSentiment>(mockSentiment);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("publishedAt");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Filter by source
    if (selectedSource !== "All Sources") {
      filtered = filtered.filter(
        (article) => article.source.name === selectedSource
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "publishedAt":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "views":
          return b.views - a.views;
        case "likes":
          return b.likes - a.likes;
        case "readTime":
          return a.readTime - b.readTime;
        default:
          return 0;
      }
    });

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, selectedSource, searchQuery, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  // const getSentimentColor = (sentiment: string) => {
  //   switch (sentiment) {
  //     case "positive":
  //       return "text-green-500";
  //     case "negative":
  //       return "text-red-500";
  //     default:
  //       return "text-gray-500";
  //   }
  // };

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFearGreedColor = (index: number) => {
    if (index <= 20) return "text-red-600";
    if (index <= 40) return "text-orange-500";
    if (index <= 60) return "text-yellow-500";
    if (index <= 80) return "text-green-500";
    return "text-green-600";
  };

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold">Crypto News</h1>
                    <p className="text-muted-foreground">
                      Stay updated with the latest cryptocurrency news and
                      market insights
                    </p>
                  </div>
                </div>

                {/* Market Sentiment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Fear & Greed Index
                          </p>
                          <div className="flex items-center space-x-2">
                            <p
                              className={`text-2xl font-bold ${getFearGreedColor(
                                sentiment.fearGreedIndex
                              )}`}
                            >
                              {sentiment.fearGreedIndex}
                            </p>
                            <Badge
                              variant="outline"
                              className={getFearGreedColor(
                                sentiment.fearGreedIndex
                              )}
                            >
                              {sentiment.sentiment}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-6 w-6 text-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Articles
                          </p>
                          <p className="text-2xl font-bold">
                            {articles.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-6 w-6 text-purple-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Last Updated
                          </p>
                          <p className="text-2xl font-bold">
                            {articles.length > 0
                              ? formatDate(articles[0].publishedAt)
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Tabs defaultValue="latest" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                </TabsList>

                <TabsContent value="latest" className="space-y-6">
                  {/* Filters */}
                  <div className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <SearchBar
                          placeholder="Search news, articles, topics..."
                          value={searchQuery}
                          onChange={setSearchQuery}
                        />
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-3 py-2 border border-border rounded-md bg-background"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>

                        <select
                          value={selectedSource}
                          onChange={(e) => setSelectedSource(e.target.value)}
                          className="px-3 py-2 border border-border rounded-md bg-background"
                        >
                          {sources.map((source) => (
                            <option key={source} value={source}>
                              {source}
                            </option>
                          ))}
                        </select>

                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="px-3 py-2 border border-border rounded-md bg-background"
                        >
                          <option value="publishedAt">Latest</option>
                          <option value="views">Most Viewed</option>
                          <option value="likes">Most Liked</option>
                          <option value="readTime">Quick Read</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                      >
                        <div className="relative">
                          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <BookOpen className="h-16 w-16 text-gray-400" />
                          </div>
                          <Badge
                            className={`absolute top-2 right-2 ${getSentimentBadgeColor(
                              article.sentiment
                            )}`}
                          >
                            {article.sentiment}
                          </Badge>
                          <Badge className="absolute top-2 left-2 bg-black/50 text-white">
                            {article.category}
                          </Badge>
                        </div>

                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg line-clamp-2 leading-tight">
                              {article.title}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 shrink-0"
                            >
                              <Bookmark
                                className={`h-4 w-4 ${
                                  article.isBookmarked ? "fill-current" : ""
                                }`}
                              />
                            </Button>
                          </div>
                          <CardDescription className="text-sm line-clamp-3">
                            {article.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <User className="h-3 w-3" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3" />
                              <span>{article.readTime} min read</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{article.likes}</span>
                              </div>
                            </div>
                            <span className="text-muted-foreground">
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {article.source.name}
                            </span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Share className="h-3 w-3 mr-1" />
                                Share
                              </Button>
                              <Button size="sm">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Read
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trending">
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Trending Articles
                    </h3>
                    <p className="text-muted-foreground">
                      Coming soon - trending articles based on engagement
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="analysis">
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Market Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Coming soon - in-depth market analysis and reports
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="bookmarks">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredArticles
                      .filter((article) => article.isBookmarked)
                      .map((article) => (
                        <Card
                          key={article.id}
                          className="hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          <CardHeader>
                            <CardTitle className="text-lg line-clamp-2">
                              {article.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {article.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {article.source.name}
                              </span>
                              <span className="text-muted-foreground">
                                {formatDate(article.publishedAt)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                  {filteredArticles.filter((article) => article.isBookmarked)
                    .length === 0 && (
                    <div className="text-center py-12">
                      <Bookmark className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No Bookmarks
                      </h3>
                      <p className="text-muted-foreground">
                        Start bookmarking articles to see them here
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No articles found matching your criteria.
                  </p>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
