import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCrypto } from '../hooks/useCrypto';
import CoinCard from '../components/coin/CoinCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Star } from 'lucide-react';

const Watchlist: React.FC = () => {
  const { coins, watchlist, loading, error, fetchCoins } = useCrypto();

  useEffect(() => {
    if (coins.length === 0) {
      fetchCoins(1, 100);
    }
  }, [coins.length, fetchCoins]);

  // Filter coins to only show those in the watchlist
  const watchlistCoins = coins.filter(coin => watchlist.includes(coin.id));

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Watchlist</h1>

      {loading && coins.length === 0 ? (
        <div className="py-8 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage 
          message={error} 
          retry={fetchCoins}
          className="max-w-lg mx-auto mb-8"
        />
      ) : watchlistCoins.length === 0 ? (
        <div className="bg-white dark:bg-background-card rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Star size={32} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your watchlist is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Start adding cryptocurrencies to track their performance
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-block"
          >
            Browse Cryptocurrencies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlistCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;