import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Coin } from '../../types/crypto';
import { useCrypto } from '../../hooks/useCrypto';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface CoinCardProps {
  coin: Coin;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useCrypto();
  const isInWatchlist = watchlist.includes(coin.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist) {
      removeFromWatchlist(coin.id);
    } else {
      addToWatchlist(coin.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/coin/${coin.id}`} className="block">
        <div className="coin-card group hover:translate-y-[-4px]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <img 
                src={coin.image} 
                alt={`${coin.name} logo`} 
                className="w-8 h-8 rounded-full" 
              />
              <div>
                <h3 className="font-medium">{coin.name}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                  {coin.symbol}
                </span>
              </div>
            </div>
            <button
              onClick={handleWatchlistToggle}
              className={`p-1.5 rounded-full transition-colors ${
                isInWatchlist 
                  ? 'text-warning-500 bg-warning-50 dark:bg-slate-800' 
                  : 'text-slate-400 hover:text-warning-500 hover:bg-warning-50 dark:hover:bg-slate-800'
              }`}
              aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              <Star size={16} fill={isInWatchlist ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-semibold">
                {formatCurrency(coin.current_price)}
              </span>
              <div 
                className={`flex items-center gap-1 text-sm ${
                  coin.price_change_percentage_24h >= 0 
                    ? 'price-up' 
                    : 'price-down'
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span>{formatPercentage(coin.price_change_percentage_24h)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Market Cap</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {formatCurrency(coin.market_cap, 0)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>Volume (24h)</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {formatCurrency(coin.total_volume, 0)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CoinCard;