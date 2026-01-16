"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Bell,
  Search,
  TrendingUp,
  Wallet,
  Star,
  Calculator,
  Zap,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  action?: () => void;
  variant?: "default" | "outline" | "secondary";
  badge?: string;
}

interface TransactionData {
  type: string;
  coin: string;
  amount: number;
  price: number;
  exchange?: string;
}

interface AlertData {
  coin: string;
  condition: string;
  targetPrice: number;
  notificationMethods: string[];
}

interface QuickActionsProps {
  onAddTransaction?: (data: TransactionData) => void;
  onCreateAlert?: (data: AlertData) => void;
  onAddToWatchlist?: (coinId: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions: QuickAction[] = [
    {
      id: "add-transaction",
      title: "Add Transaction",
      description: "Record a buy/sell transaction",
      icon: Plus,
      action: () => setIsAddTransactionOpen(true),
      variant: "outline",
    },
    {
      id: "create-alert",
      title: "Price Alert",
      description: "Set price notifications",
      icon: Bell,
      action: () => setIsCreateAlertOpen(true),
      variant: "outline",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "View your holdings",
      icon: Wallet,
      href: "/portfolio",
      variant: "outline",
    },
    {
      id: "watchlist",
      title: "Watchlist",
      description: "Track favorite coins",
      icon: Star,
      href: "/watchlist",
      variant: "outline",
      badge: "5",
    },
    {
      id: "calculator",
      title: "Calculator",
      description: "Crypto converter",
      icon: Calculator,
      href: "/tools/calculator",
      variant: "outline",
    },
    {
      id: "defi",
      title: "DeFi Yields",
      description: "Find best yields",
      icon: TrendingUp,
      href: "/defi/yields",
      variant: "outline",
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Market insights",
      icon: BarChart3,
      href: "/analytics",
      variant: "outline",
    },
    {
      id: "quick-buy",
      title: "Quick Buy",
      description: "Buy crypto instantly",
      icon: Zap,
      href: "/buy",
      variant: "secondary",
    },
  ];

  const AddTransactionDialog = () => (
    <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coin">Cryptocurrency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select coin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                  <SelectItem value="cardano">Cardano (ADA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="0.00" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" placeholder="0.00" type="number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="exchange">Exchange (Optional)</Label>
            <Input id="exchange" placeholder="e.g., Binance, Coinbase" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsAddTransactionOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle transaction submission
                setIsAddTransactionOpen(false);
              }}
            >
              Add Transaction
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const CreateAlertDialog = () => (
    <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Price Alert</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alert-coin">Cryptocurrency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select coin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                <SelectItem value="cardano">Cardano (ADA)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Above</SelectItem>
                  <SelectItem value="below">Below</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-price">Target Price</Label>
              <Input id="target-price" placeholder="0.00" type="number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notification Method</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm">Push</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsCreateAlertOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle alert creation
                setIsCreateAlertOpen(false);
              }}
            >
              Create Alert
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⚡ Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Search */}
        <div className="space-y-2">
          <Label htmlFor="quick-search">Quick Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="quick-search"
              placeholder="Search cryptocurrencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const ActionButton = (
              <Button
                key={action.id}
                variant={action.variant || "outline"}
                className="h-auto p-4 flex flex-col items-center space-y-2 relative"
                onClick={action.action}
                asChild={!!action.href}
              >
                {action.href ? (
                  <Link
                    href={action.href}
                    className="flex flex-col items-center space-y-2"
                  >
                    <action.icon className="h-5 w-5" />
                    <div className="text-center">
                      <div className="font-medium text-xs">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                    {action.badge && (
                      <div className="absolute -top-1 -right-1 bg-coingecko-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {action.badge}
                      </div>
                    )}
                  </Link>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <action.icon className="h-5 w-5" />
                    <div className="text-center">
                      <div className="font-medium text-xs">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                    {action.badge && (
                      <div className="absolute -top-1 -right-1 bg-coingecko-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {action.badge}
                      </div>
                    )}
                  </div>
                )}
              </Button>
            );

            return ActionButton;
          })}
        </div>

        {/* Featured Action */}
        <div className="pt-4 border-t">
          <Button className="w-full" asChild>
            <Link href="/portfolio/sync">
              <Wallet className="h-4 w-4 mr-2" />
              Sync Wallet Portfolio
            </Link>
          </Button>
        </div>
      </CardContent>

      {/* Dialogs */}
      <AddTransactionDialog />
      <CreateAlertDialog />
    </Card>
  );
};
