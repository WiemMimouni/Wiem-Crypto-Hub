"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ExternalLink, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  sourceUrl: string;
  source: string;
  category:
    | "bitcoin"
    | "ethereum"
    | "defi"
    | "nft"
    | "regulation"
    | "market"
    | "technology";
  readTime: number;
  tags: string[];
}

interface FeaturedNewsProps {
  articles: NewsArticle[];
  isLoading?: boolean;
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({
  articles,
  isLoading = false,
}) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      bitcoin:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      ethereum: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      defi: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      nft: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      regulation: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      market:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      technology:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    return colors[category as keyof typeof colors] || colors.market;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-video bg-muted rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No news articles available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 4);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <span>📰</span>
          Latest Crypto News
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="/news"
            className="text-coingecko-green-500 hover:text-coingecko-green-600"
          >
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                <Badge className={getCategoryColor(featuredArticle.category)}>
                  {featuredArticle.category.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Link
                href={`/news/${featuredArticle.id}`}
                className="block group"
              >
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {featuredArticle.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatTimeAgo(featuredArticle.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{featuredArticle.readTime} min read</span>
                  </div>
                </div>
                <span className="font-medium">{featuredArticle.source}</span>
              </div>
            </div>
          </div>
        )}

        {/* Other Articles */}
        {otherArticles.length > 0 && (
          <div className="space-y-4">
            {otherArticles.map((article) => (
              <div key={article.id} className="flex space-x-4 group">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getCategoryColor(
                        article.category
                      )}`}
                    >
                      {article.category.toUpperCase()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild
                    >
                      <Link href={article.sourceUrl} target="_blank">
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                  <Link
                    href={`/news/${article.id}`}
                    className="block group-hover:text-primary transition-colors"
                  >
                    <h4 className="font-medium text-sm leading-tight line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                    <span>•</span>
                    <span>{article.readTime} min</span>
                    <span>•</span>
                    <span>{article.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/news">View All News</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
