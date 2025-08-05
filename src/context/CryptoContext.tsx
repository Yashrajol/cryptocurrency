import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { 
  getCoins, 
  getTrendingCoins, 
  getCoinDetails, 
  getCoinChartData,
  searchCoins,
  getGlobalData
} from '../api/coinGecko';
import { Coin, TrendingResponse, CoinDetail, ChartData, GlobalData } from '../types/crypto';

interface CryptoContextType {
  coins: Coin[];
  trendingCoins: TrendingResponse | null;
  selectedCoin: CoinDetail | null;
  chartData: ChartData | null;
  globalData: GlobalData | null;
  watchlist: string[];
  searchResults: any;
  loading: boolean;
  error: string | null;
  fetchCoins: (page?: number, perPage?: number) => Promise<void>;
  fetchTrendingCoins: () => Promise<void>;
  fetchCoinDetails: (id: string) => Promise<void>;
  fetchCoinChartData: (id: string, days?: number) => Promise<void>;
  fetchMarketData: () => Promise<void>;
  searchCryptoCoins: (query: string) => Promise<void>;
  addToWatchlist: (id: string) => void;
  removeFromWatchlist: (id: string) => void;
}

export const CryptoContext = createContext<CryptoContextType>({} as CryptoContextType);

export const CryptoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [trendingCoins, setTrendingCoins] = useState<TrendingResponse | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<CoinDetail | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize watchlist from localStorage if available
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save watchlist to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleError = (error: any) => {
    const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
    setError(errorMessage);
    console.error('API Error:', error);
  };

  const fetchCoins = useCallback(async (page = 1, perPage = 20) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCoins(page, perPage);
      setCoins(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrendingCoins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrendingCoins();
      setTrendingCoins(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCoinDetails = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCoinDetails(id);
      setSelectedCoin(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCoinChartData = useCallback(async (id: string, days = 7) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCoinChartData(id, days);
      setChartData(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMarketData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [coinsData, globalMarketData] = await Promise.all([
        getCoins(),
        getGlobalData()
      ]);
      setCoins(coinsData);
      setGlobalData(globalMarketData.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCryptoCoins = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const data = await searchCoins(query);
      setSearchResults(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToWatchlist = useCallback((id: string) => {
    setWatchlist(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setWatchlist(prev => prev.filter(coinId => coinId !== id));
  }, []);

  const value = {
    coins,
    trendingCoins,
    selectedCoin,
    chartData,
    globalData,
    watchlist,
    searchResults,
    loading,
    error,
    fetchCoins,
    fetchTrendingCoins,
    fetchCoinDetails,
    fetchCoinChartData,
    fetchMarketData,
    searchCryptoCoins,
    addToWatchlist,
    removeFromWatchlist
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};