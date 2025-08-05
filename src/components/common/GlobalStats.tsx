import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCrypto } from '../../hooks/useCrypto';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const GlobalStats: React.FC = () => {
  const { globalData, loading } = useCrypto();

  if (loading || !globalData) {
    return (
      <div className="bg-white dark:bg-background-card p-4 rounded-lg shadow-sm animate-pulse">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const totalMarketCap = globalData.total_market_cap.usd;
  const totalVolume = globalData.total_volume.usd;
  const marketCapChange = globalData.market_cap_change_percentage_24h_usd;
  const btcDominance = globalData.market_cap_percentage.btc;
  const ethDominance = globalData.market_cap_percentage.eth;

  return (
    <div className="bg-white dark:bg-background-card p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-3">Global Crypto Market</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
          <p className="text-xs text-slate-500 dark:text-slate-400">Market Cap</p>
          <p className="font-medium">{formatCurrency(totalMarketCap, 0)}</p>
          <div className={`flex items-center text-xs mt-1 ${
            marketCapChange >= 0 ? 'text-accent-500' : 'text-error-500'
          }`}>
            {marketCapChange >= 0 ? (
              <TrendingUp size={12} className="mr-1" />
            ) : (
              <TrendingDown size={12} className="mr-1" />
            )}
            <span>{formatPercentage(marketCapChange)}</span>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
          <p className="text-xs text-slate-500 dark:text-slate-400">24h Volume</p>
          <p className="font-medium">{formatCurrency(totalVolume, 0)}</p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
          <p className="text-xs text-slate-500 dark:text-slate-400">BTC Dominance</p>
          <p className="font-medium">{formatPercentage(btcDominance)}</p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
          <p className="text-xs text-slate-500 dark:text-slate-400">ETH Dominance</p>
          <p className="font-medium">{formatPercentage(ethDominance)}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;