import axios, { AxiosError } from 'axios';
import { Coin, TrendingResponse, CoinDetail, ChartData, GlobalData } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Add a delay function to avoid rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create axios instance with base URL and timeout
const coinGeckoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Exponential backoff retry logic
const retryWithExponentialBackoff = async (
  fn: () => Promise<any>,
  retries = 3,
  baseDelay = 1000
) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = i === retries - 1;
      if (isLastAttempt) throw error;

      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Add response interceptor to handle rate limiting and other common errors
coinGeckoApi.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (!error.response) {
      throw new Error('Network error: Please check your internet connection');
    }

    switch (error.response.status) {
      case 429:
        // Wait 60 seconds before retrying on rate limit
        await delay(60000);
        return coinGeckoApi(error.config);
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('CoinGecko API is experiencing issues');
      default:
        throw error;
    }
  }
);

// Helper function to check network connectivity
const checkNetworkConnectivity = () => {
  if (!navigator.onLine) {
    throw new Error('No internet connection available');
  }
};

// Get market data for coins
export const getCoins = async (
  page = 1,
  perPage = 20,
  currency = 'usd',
  orderBy = 'market_cap_desc'
): Promise<Coin[]> => {
  checkNetworkConnectivity();
  
  return retryWithExponentialBackoff(async () => {
    try {
      const response = await coinGeckoApi.get('/coins/markets', {
        params: {
          vs_currency: currency,
          order: orderBy,
          per_page: perPage,
          page: page,
          sparkline: false,
          price_change_percentage: '24h',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coins:', error);
      throw error;
    }
  });
};

// Get trending coins
export const getTrendingCoins = async (): Promise<TrendingResponse> => {
  checkNetworkConnectivity();
  
  return retryWithExponentialBackoff(async () => {
    try {
      const response = await coinGeckoApi.get('/search/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      throw error;
    }
  });
};

// Get detailed information about a specific coin
export const getCoinDetails = async (id: string): Promise<CoinDetail> => {
  checkNetworkConnectivity();
  
  return retryWithExponentialBackoff(async () => {
    try {
      const response = await coinGeckoApi.get(`/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: true,
          developer_data: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for coin ${id}:`, error);
      throw error;
    }
  });
};

// Get historical market data for a specific coin
export const getCoinChartData = async (
  id: string,
  days = 7,
  currency = 'usd'
): Promise<ChartData> => {
  checkNetworkConnectivity();
  
  return retryWithExponentialBackoff(async () => {
    try {
      const response = await coinGeckoApi.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: currency,
          days: days,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching chart data for coin ${id}:`, error);
      throw error;
    }
  });
};

// Search for coins
export const searchCoins = async (query: string): Promise<any> => {
  checkNetworkConnectivity();
  
  return retryWithExponentialBackoff(async () => {
    try {
      const response = await coinGeckoApi.get('/search', {
        params: {
          query: query,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching coins:', error);
      throw error;
    }
  });
};

// Get global crypto market data
export const getGlobalData = async (): Promise<{ data: GlobalData }> => {
  checkNetworkConnectivity();
  
  return retryWithExponentialBackoff(async () => {
    try {
      const response = await coinGeckoApi.get('/global');
      return response.data;
    } catch (error) {
      console.error('Error fetching global data:', error);
      throw error;
    }
  });
};