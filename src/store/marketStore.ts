import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  ath: number;
  athChangePercentage: number;
  athDate: string;
  atl: number;
  atlChangePercentage: number;
  atlDate: string;
  lastUpdated: string;
}

export interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  marketCapPercentage: { [key: string]: number };
  marketCapChangePercentage24hUsd: number;
  activeCryptocurrencies: number;
  markets: number;
  endedIcos: number;
  ongoingIcos: number;
  upcomingIcos: number;
  updatedAt: number;
}

export interface TrendingCoin {
  id: string;
  coinId: number;
  name: string;
  symbol: string;
  marketCapRank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  priceBtc: number;
  score: number;
}

interface MarketState {
  // Data
  coins: CoinData[];
  trendingCoins: TrendingCoin[];
  globalStats: MarketStats | null;
  fearGreedIndex: number;

  // Loading states
  isLoadingCoins: boolean;
  isLoadingTrending: boolean;
  isLoadingGlobal: boolean;

  // Error states
  coinsError: string | null;
  trendingError: string | null;
  globalError: string | null;

  // Filters and pagination
  currentPage: number;
  perPage: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  priceFilter: { min: number; max: number } | null;

  // Actions
  setCoins: (coins: CoinData[]) => void;
  setTrendingCoins: (coins: TrendingCoin[]) => void;
  setGlobalStats: (stats: MarketStats) => void;
  setFearGreedIndex: (index: number) => void;

  setCoinsLoading: (loading: boolean) => void;
  setTrendingLoading: (loading: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;

  setCoinsError: (error: string | null) => void;
  setTrendingError: (error: string | null) => void;
  setGlobalError: (error: string | null) => void;

  // Pagination and filtering
  setPage: (page: number) => void;
  setSorting: (sortBy: string, order: "asc" | "desc") => void;
  setPriceFilter: (filter: { min: number; max: number } | null) => void;

  // API actions
  fetchCoins: () => Promise<void>;
  fetchTrendingCoins: () => Promise<void>;
  fetchGlobalStats: () => Promise<void>;
  fetchFearGreedIndex: () => Promise<void>;

  // Utility actions
  getCoinById: (id: string) => CoinData | undefined;
  searchCoins: (query: string) => CoinData[];
  getTopCoins: (limit: number) => CoinData[];
}

export const useMarketStore = create<MarketState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      coins: [],
      trendingCoins: [],
      globalStats: null,
      fearGreedIndex: 50,

      isLoadingCoins: false,
      isLoadingTrending: false,
      isLoadingGlobal: false,

      coinsError: null,
      trendingError: null,
      globalError: null,

      currentPage: 1,
      perPage: 50,
      sortBy: "market_cap",
      sortOrder: "desc",
      priceFilter: null,

      // Setters
      setCoins: (coins) => set({ coins }),
      setTrendingCoins: (trendingCoins) => set({ trendingCoins }),
      setGlobalStats: (globalStats) => set({ globalStats }),
      setFearGreedIndex: (fearGreedIndex) => set({ fearGreedIndex }),

      setCoinsLoading: (isLoadingCoins) => set({ isLoadingCoins }),
      setTrendingLoading: (isLoadingTrending) => set({ isLoadingTrending }),
      setGlobalLoading: (isLoadingGlobal) => set({ isLoadingGlobal }),

      setCoinsError: (coinsError) => set({ coinsError }),
      setTrendingError: (trendingError) => set({ trendingError }),
      setGlobalError: (globalError) => set({ globalError }),

      setPage: (currentPage) => set({ currentPage }),
      setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
      setPriceFilter: (priceFilter) => set({ priceFilter }),

      // API actions (mock implementations)
      fetchCoins: async () => {
        const { setCoinsLoading, setCoinsError, setCoins } = get();

        try {
          setCoinsLoading(true);
          setCoinsError(null);

          // Mock API call - replace with actual CoinGecko API
          const mockCoins: CoinData[] = [
            {
              id: "bitcoin",
              symbol: "btc",
              name: "Bitcoin",
              image:
                "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
              currentPrice: 43250.5,
              marketCap: 847000000000,
              marketCapRank: 1,
              fullyDilutedValuation: 908000000000,
              totalVolume: 28000000000,
              high24h: 44100,
              low24h: 42800,
              priceChange24h: 1825.3,
              priceChangePercentage24h: 4.42,
              marketCapChange24h: 35000000000,
              marketCapChangePercentage24h: 4.31,
              circulatingSupply: 19600000,
              totalSupply: 19600000,
              maxSupply: 21000000,
              ath: 69045,
              athChangePercentage: -37.4,
              athDate: "2021-11-10T14:24:11.849Z",
              atl: 67.81,
              atlChangePercentage: 63700.5,
              atlDate: "2013-07-06T00:00:00.000Z",
              lastUpdated: new Date().toISOString(),
            },
            {
              id: "ethereum",
              symbol: "eth",
              name: "Ethereum",
              image:
                "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
              currentPrice: 2580.75,
              marketCap: 310000000000,
              marketCapRank: 2,
              fullyDilutedValuation: 310000000000,
              totalVolume: 15000000000,
              high24h: 2650,
              low24h: 2500,
              priceChange24h: 95.25,
              priceChangePercentage24h: 3.83,
              marketCapChange24h: 11000000000,
              marketCapChangePercentage24h: 3.68,
              circulatingSupply: 120280000,
              totalSupply: 120280000,
              maxSupply: null,
              ath: 4878.26,
              athChangePercentage: -47.1,
              athDate: "2021-11-10T14:24:19.604Z",
              atl: 0.432979,
              atlChangePercentage: 596000.2,
              atlDate: "2015-10-20T00:00:00.000Z",
              lastUpdated: new Date().toISOString(),
            },
          ];

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          setCoins(mockCoins);
        } catch (error) {
          setCoinsError(
            error instanceof Error ? error.message : "Failed to fetch coins"
          );
        } finally {
          setCoinsLoading(false);
        }
      },

      fetchTrendingCoins: async () => {
        const { setTrendingLoading, setTrendingError, setTrendingCoins } =
          get();

        try {
          setTrendingLoading(true);
          setTrendingError(null);

          // Mock trending coins
          const mockTrending: TrendingCoin[] = [
            {
              id: "bitcoin",
              coinId: 1,
              name: "Bitcoin",
              symbol: "btc",
              marketCapRank: 1,
              thumb:
                "https://coin-images.coingecko.com/coins/images/1/thumb/bitcoin.png",
              small:
                "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png",
              large:
                "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
              slug: "bitcoin",
              priceBtc: 1,
              score: 0,
            },
          ];

          await new Promise((resolve) => setTimeout(resolve, 500));
          setTrendingCoins(mockTrending);
        } catch (error) {
          setTrendingError(
            error instanceof Error
              ? error.message
              : "Failed to fetch trending coins"
          );
        } finally {
          setTrendingLoading(false);
        }
      },

      fetchGlobalStats: async () => {
        const { setGlobalLoading, setGlobalError, setGlobalStats } = get();

        try {
          setGlobalLoading(true);
          setGlobalError(null);

          // Mock global stats
          const mockStats: MarketStats = {
            totalMarketCap: 2340000000000,
            totalVolume24h: 89000000000,
            marketCapPercentage: { btc: 42.3, eth: 18.2 },
            marketCapChangePercentage24hUsd: 2.4,
            activeCryptocurrencies: 13847,
            markets: 764,
            endedIcos: 3738,
            ongoingIcos: 49,
            upcomingIcos: 263,
            updatedAt: Date.now(),
          };

          await new Promise((resolve) => setTimeout(resolve, 300));
          setGlobalStats(mockStats);
        } catch (error) {
          setGlobalError(
            error instanceof Error
              ? error.message
              : "Failed to fetch global stats"
          );
        } finally {
          setGlobalLoading(false);
        }
      },

      fetchFearGreedIndex: async () => {
        try {
          // Mock fear & greed index (0-100)
          const mockIndex = Math.floor(Math.random() * 100);
          set({ fearGreedIndex: mockIndex });
        } catch (error) {
          console.error("Failed to fetch fear & greed index:", error);
        }
      },

      // Utility functions
      getCoinById: (id: string) => {
        const { coins } = get();
        return coins.find((coin) => coin.id === id);
      },

      searchCoins: (query: string) => {
        const { coins } = get();
        const lowercaseQuery = query.toLowerCase();
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(lowercaseQuery) ||
            coin.symbol.toLowerCase().includes(lowercaseQuery)
        );
      },

      getTopCoins: (limit: number) => {
        const { coins } = get();
        return coins
          .sort((a, b) => a.marketCapRank - b.marketCapRank)
          .slice(0, limit);
      },
    })),
    { name: "market-store" }
  )
);
