"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Star, Search, Play, Users } from "lucide-react";

// Mock educational content
const courses = [
  {
    id: 1,
    title: "Cryptocurrency Fundamentals",
    description:
      "Learn the basics of blockchain technology and cryptocurrencies",
    level: "Beginner",
    duration: "2 hours",
    lessons: 8,
    rating: 4.8,
    enrolled: 12500,
    category: "basics",
    thumbnail: "/course-1.jpg",
  },
  {
    id: 2,
    title: "DeFi Deep Dive",
    description: "Explore decentralized finance protocols and yield farming",
    level: "Intermediate",
    duration: "4 hours",
    lessons: 12,
    rating: 4.9,
    enrolled: 8900,
    category: "defi",
    thumbnail: "/course-2.jpg",
  },
  {
    id: 3,
    title: "Technical Analysis Mastery",
    description: "Master the art of reading charts and market indicators",
    level: "Advanced",
    duration: "6 hours",
    lessons: 15,
    rating: 4.7,
    enrolled: 6200,
    category: "trading",
    thumbnail: "/course-3.jpg",
  },
];

const articles = [
  {
    id: 1,
    title: "What is Bitcoin?",
    description: "A comprehensive guide to understanding Bitcoin",
    readTime: "5 min",
    category: "basics",
    tags: ["Bitcoin", "Cryptocurrency", "Blockchain"],
  },
  {
    id: 2,
    title: "How to Analyze Market Trends",
    description: "Learn to read market charts and identify patterns",
    readTime: "8 min",
    category: "trading",
    tags: ["Trading", "Technical Analysis", "Charts"],
  },
  {
    id: 3,
    title: "DeFi Yield Farming Strategies",
    description: "Maximize your returns with smart yield farming",
    readTime: "10 min",
    category: "defi",
    tags: ["DeFi", "Yield Farming", "Liquidity"],
  },
];

const glossary = [
  {
    term: "Blockchain",
    definition:
      "A distributed ledger technology that maintains a continuously growing list of records",
  },
  {
    term: "DeFi",
    definition:
      "Decentralized Finance - financial services built on blockchain technology",
  },
  {
    term: "Smart Contract",
    definition:
      "Self-executing contracts with the terms directly written into code",
  },
];

export default function EducationPageClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "all" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === "all" || article.category === selectedCategory) &&
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <BookOpen className="h-8 w-8 text-blue-500" />
                    Crypto Education
                  </h1>
                  <p className="text-muted-foreground">
                    Learn about cryptocurrency, blockchain, and DeFi
                  </p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses and articles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="all">All Categories</option>
                  <option value="basics">Basics</option>
                  <option value="trading">Trading</option>
                  <option value="defi">DeFi</option>
                </select>
              </div>

              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                  <TabsTrigger value="glossary">Glossary</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{course.level}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{course.rating}</span>
                            </div>
                          </div>
                          <CardTitle className="text-lg">
                            {course.title}
                          </CardTitle>
                          <CardDescription>
                            {course.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {course.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {course.enrolled.toLocaleString()}
                              </div>
                            </div>
                            <Button className="w-full">
                              <Play className="mr-2 h-4 w-4" />
                              Start Course
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="articles" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{article.category}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {article.readTime}
                            </span>
                          </div>
                          <CardTitle className="text-lg">
                            {article.title}
                          </CardTitle>
                          <CardDescription>
                            {article.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {article.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button variant="outline" className="w-full">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Read Article
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="glossary" className="space-y-6">
                  <div className="space-y-4">
                    {glossary.map((item, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{item.term}</CardTitle>
                          <CardDescription>{item.definition}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
