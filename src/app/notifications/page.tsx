"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  BellOff,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Clock,
  Check,
  X,
  Settings,
  MoreHorizontal,
  Search,
  Plus,
  Mail,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Volume2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Notification {
  id: string;
  type:
    | "price_alert"
    | "news"
    | "portfolio"
    | "system"
    | "watchlist"
    | "security"
    | "social";
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  icon: React.ComponentType<{ className?: string }>;
  action?: {
    label: string;
    href: string;
  };
  data?: {
    symbol?: string;
    price?: number;
    change?: number;
    amount?: number;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "price_alert",
    title: "Bitcoin Price Alert",
    description: "BTC has reached your target price of $45,000",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isRead: false,
    priority: "high",
    icon: TrendingUp,
    action: {
      label: "View Chart",
      href: "/coin/bitcoin",
    },
    data: {
      symbol: "BTC",
      price: 45250,
      change: 3.2,
    },
  },
  {
    id: "2",
    type: "portfolio",
    title: "Portfolio Milestone",
    description: "Congratulations! Your portfolio has reached $50,000",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    priority: "high",
    icon: DollarSign,
    action: {
      label: "View Portfolio",
      href: "/portfolio",
    },
    data: {
      amount: 50000,
      change: 8.5,
    },
  },
  {
    id: "3",
    type: "security",
    title: "New Device Login",
    description: "A new device has logged into your account from New York, USA",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isRead: false,
    priority: "urgent",
    icon: Shield,
    action: {
      label: "Review Activity",
      href: "/security",
    },
  },
  {
    id: "4",
    type: "news",
    title: "Major Market News",
    description:
      "SEC approves new cryptocurrency ETF proposals - Market rallying",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true,
    priority: "medium",
    icon: AlertTriangle,
    action: {
      label: "Read More",
      href: "/news",
    },
  },
  {
    id: "5",
    type: "watchlist",
    title: "Ethereum Price Drop",
    description:
      "ETH has dropped 5% from your watchlist price - consider buying the dip",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    isRead: true,
    priority: "medium",
    icon: TrendingDown,
    action: {
      label: "View Watchlist",
      href: "/watchlist",
    },
    data: {
      symbol: "ETH",
      price: 2850,
      change: -5.2,
    },
  },
  {
    id: "6",
    type: "social",
    title: "Whale Alert",
    description:
      "Large Bitcoin transaction detected: 1,000 BTC moved to unknown wallet",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isRead: true,
    priority: "medium",
    icon: AlertTriangle,
  },
  {
    id: "7",
    type: "system",
    title: "System Maintenance Complete",
    description:
      "Scheduled maintenance has been completed. All services are now operational",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isRead: true,
    priority: "low",
    icon: Settings,
  },
  {
    id: "8",
    type: "portfolio",
    title: "Rebalancing Suggestion",
    description:
      "Your portfolio allocation has shifted. Consider rebalancing your holdings",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
    priority: "low",
    icon: DollarSign,
    action: {
      label: "View Suggestions",
      href: "/portfolio/rebalance",
    },
  },
];

const notificationSettings = [
  {
    id: "price_alerts",
    label: "Price Alerts",
    description: "Get notified when prices reach your targets",
    enabled: true,
    channels: ["email", "push", "sms"],
    icon: TrendingUp,
  },
  {
    id: "portfolio_updates",
    label: "Portfolio Updates",
    description: "Daily and weekly portfolio performance summaries",
    enabled: true,
    channels: ["email", "push"],
    icon: DollarSign,
  },
  {
    id: "market_news",
    label: "Market News",
    description: "Breaking news and important market updates",
    enabled: false,
    channels: ["push"],
    icon: Globe,
  },
  {
    id: "watchlist_changes",
    label: "Watchlist Changes",
    description: "Notifications for your watchlist coins",
    enabled: true,
    channels: ["push"],
    icon: Bell,
  },
  {
    id: "security_alerts",
    label: "Security Alerts",
    description: "Account security and login notifications",
    enabled: true,
    channels: ["email", "sms"],
    icon: Shield,
  },
  {
    id: "system_updates",
    label: "System Updates",
    description: "Platform updates and maintenance notices",
    enabled: true,
    channels: ["email"],
    icon: Settings,
  },
  {
    id: "social_updates",
    label: "Social & Whale Alerts",
    description: "Large transactions and social sentiment updates",
    enabled: false,
    channels: ["push"],
    icon: Volume2,
  },
];

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [settings, setSettings] = useState(notificationSettings);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlertSymbol, setNewAlertSymbol] = useState("");
  const [newAlertPrice, setNewAlertPrice] = useState("");
  const [newAlertType, setNewAlertType] = useState("above");

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const toggleSetting = (settingId: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const createPriceAlert = () => {
    if (!newAlertSymbol || !newAlertPrice) return;

    const newAlert: Notification = {
      id: Date.now().toString(),
      type: "price_alert",
      title: `New Price Alert Created`,
      description: `Alert set for ${newAlertSymbol.toUpperCase()} ${newAlertType} $${newAlertPrice}`,
      timestamp: new Date(),
      isRead: false,
      priority: "medium",
      icon: Bell,
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setNewAlertSymbol("");
    setNewAlertPrice("");
    setShowCreateAlert(false);
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notif.isRead) ||
      notif.type === activeTab;

    const matchesSearch =
      !searchQuery ||
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      filterPriority === "all" || notif.priority === filterPriority;

    return matchesTab && matchesSearch && matchesPriority;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const urgentCount = notifications.filter(
    (n) => !n.isRead && n.priority === "urgent"
  ).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-600";
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "price_alert":
        return TrendingUp;
      case "portfolio":
        return DollarSign;
      case "security":
        return Shield;
      case "news":
        return Globe;
      case "watchlist":
        return Bell;
      case "social":
        return Volume2;
      case "system":
        return Settings;
      default:
        return Bell;
    }
  };

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
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Bell className="h-8 w-8" />
                    Notifications
                    {unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white">
                        {unreadCount}
                      </Badge>
                    )}
                    {urgentCount > 0 && (
                      <Badge className="bg-red-600 text-white animate-pulse">
                        {urgentCount} Urgent
                      </Badge>
                    )}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Stay updated with your crypto portfolio and market movements
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog
                    open={showCreateAlert}
                    onOpenChange={setShowCreateAlert}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Alert
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Price Alert</DialogTitle>
                        <DialogDescription>
                          Get notified when a cryptocurrency reaches your target
                          price
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="symbol">Cryptocurrency Symbol</Label>
                          <Input
                            id="symbol"
                            placeholder="e.g., BTC, ETH"
                            value={newAlertSymbol}
                            onChange={(e) => setNewAlertSymbol(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="alertType">Alert Type</Label>
                          <Select
                            value={newAlertType}
                            onValueChange={setNewAlertType}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="above">
                                Price goes above
                              </SelectItem>
                              <SelectItem value="below">
                                Price goes below
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">Target Price ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="e.g., 45000"
                            value={newAlertPrice}
                            onChange={(e) => setNewAlertPrice(e.target.value)}
                          />
                        </div>
                        <Button onClick={createPriceAlert} className="w-full">
                          Create Alert
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-8">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </TabsTrigger>
                  <TabsTrigger value="price_alert">Price</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="news">News</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="settings" className="mt-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Notification Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {settings.map((setting) => {
                          const IconComponent = setting.icon;
                          return (
                            <motion.div
                              key={setting.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start justify-between p-4 border rounded-lg"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-muted">
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="space-y-1">
                                  <Label
                                    htmlFor={setting.id}
                                    className="text-base font-medium"
                                  >
                                    {setting.label}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {setting.description}
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    {setting.channels.map((channel) => (
                                      <Badge
                                        key={channel}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {channel === "email" && (
                                          <Mail className="h-3 w-3 mr-1" />
                                        )}
                                        {channel === "push" && (
                                          <Smartphone className="h-3 w-3 mr-1" />
                                        )}
                                        {channel === "sms" && (
                                          <Zap className="h-3 w-3 mr-1" />
                                        )}
                                        {channel}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Switch
                                id={setting.id}
                                checked={setting.enabled}
                                onCheckedChange={() =>
                                  toggleSetting(setting.id)
                                }
                              />
                            </motion.div>
                          );
                        })}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Default Sound</Label>
                            <Select defaultValue="default">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="chime">Chime</SelectItem>
                                <SelectItem value="bell">Bell</SelectItem>
                                <SelectItem value="none">Silent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Quiet Hours</Label>
                            <Select defaultValue="none">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="night">
                                  10 PM - 7 AM
                                </SelectItem>
                                <SelectItem value="work">
                                  9 AM - 5 PM
                                </SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {[
                  "all",
                  "unread",
                  "price_alert",
                  "portfolio",
                  "security",
                  "news",
                  "social",
                ].map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-6">
                    <div className="space-y-4">
                      {filteredNotifications.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                          <BellOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            No notifications
                          </h3>
                          <p className="text-muted-foreground">
                            {activeTab === "unread"
                              ? "All caught up! No unread notifications."
                              : searchQuery
                              ? "No notifications match your search criteria."
                              : "You'll see notifications here when they arrive."}
                          </p>
                        </motion.div>
                      ) : (
                        filteredNotifications.map((notification, index) => {
                          const IconComponent = getNotificationIcon(notification.type);
                          return (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card
                                className={`transition-all duration-200 hover:shadow-md ${
                                  !notification.isRead
                                    ? "border-l-4 border-l-blue-500"
                                    : ""
                                } ${
                                  notification.priority === "urgent"
                                    ? "ring-2 ring-red-500 ring-opacity-20"
                                    : ""
                                }`}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                      <div
                                        className={`p-2 rounded-full ${
                                          notification.priority === "urgent"
                                            ? "bg-red-100 dark:bg-red-900"
                                            : "bg-muted"
                                        }`}
                                      >
                                        <IconComponent
                                          className={`h-5 w-5 ${
                                            notification.priority === "urgent"
                                              ? "text-red-600 dark:text-red-400"
                                              : ""
                                          }`}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-base font-medium">
                                              {notification.title}
                                            </h3>
                                            <div
                                              className={`w-2 h-2 rounded-full ${getPriorityColor(
                                                notification.priority
                                              )}`}
                                            />
                                            {!notification.isRead && (
                                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            )}
                                            {notification.priority ===
                                              "urgent" && (
                                              <Badge className="bg-red-600 text-white text-xs animate-pulse">
                                                URGENT
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-sm text-muted-foreground mb-2">
                                            {notification.description}
                                          </p>
                                          {notification.data && (
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                              {notification.data.symbol && (
                                                <span className="font-medium">
                                                  {notification.data.symbol}
                                                </span>
                                              )}
                                              {notification.data.price && (
                                                <span>
                                                  $
                                                  {notification.data.price.toLocaleString()}
                                                </span>
                                              )}
                                              {notification.data.change && (
                                                <span
                                                  className={
                                                    notification.data.change > 0
                                                      ? "text-green-500"
                                                      : "text-red-500"
                                                  }
                                                >
                                                  {notification.data.change > 0
                                                    ? "+"
                                                    : ""}
                                                  {notification.data.change.toFixed(
                                                    2
                                                  )}
                                                  %
                                                </span>
                                              )}
                                              {notification.data.amount && (
                                                <span className="font-medium">
                                                  $
                                                  {notification.data.amount.toLocaleString()}
                                                </span>
                                              )}
                                            </div>
                                          )}
                                          <div className="flex items-center gap-4 mt-3">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                              <Clock className="h-3 w-3" />
                                              {formatTimeAgo(
                                                notification.timestamp
                                              )}
                                            </span>
                                            {notification.action && (
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-7 text-xs"
                                                onClick={() =>
                                                  window.open(
                                                    notification.action?.href,
                                                    "_self"
                                                  )
                                                }
                                              >
                                                {notification.action.label}
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-8 w-8"
                                            >
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent>
                                            {!notification.isRead && (
                                              <DropdownMenuItem
                                                onClick={() =>
                                                  markAsRead(notification.id)
                                                }
                                              >
                                                <Check className="h-4 w-4 mr-2" />
                                                Mark as Read
                                              </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                              onClick={() =>
                                                deleteNotification(
                                                  notification.id
                                                )
                                              }
                                              className="text-red-600"
                                            >
                                              <X className="h-4 w-4 mr-2" />
                                              Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
