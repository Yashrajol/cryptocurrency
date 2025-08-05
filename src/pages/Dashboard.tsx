import React, { useState, useEffect } from 'react';
import { useCrypto } from '../hooks/useCrypto';
import CoinCard from '../components/coin/CoinCard';
import GlobalStats from '../components/common/GlobalStats';
import SearchBar from '../components/search/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { coins, trendingCoins, loading, error, fetchCoins } = useCrypto();
  const [displayedCoins, setDisplayedCoins] = useState<number>(10);

  useEffect(() => {
    if (coins.length === 0 && !loading && !error) {
      fetchCoins();
    }
  }, [coins.length, loading, error, fetchCoins]);

  const loadMore = () => {
    setDisplayedCoins(prev => Math.min(prev + 10, coins.length));
  };

  const renderTrendingSection = () => {
    if (!trendingCoins || trendingCoins.coins.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Trending Cryptocurrencies</h2>
          <Link to="/search" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center text-sm font-medium">
            View all
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingCoins.coins.slice(0, 4).map(({ item }) => {
            // Find the corresponding full coin data if available
            const fullCoin = coins.find(c => c.id === item.id);
            
            if (fullCoin) {
              return <CoinCard key={item.id} coin={fullCoin} />;
            }
            
            // Fallback if full coin data is not available
            return (
              <div key={item.id} className="coin-card hover:translate-y-[-4px]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.small} 
                      alt={`${item.name} logo`} 
                      className="w-8 h-8 rounded-full" 
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                        {item.symbol}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Rank</span>
                    <span className="font-medium">#{item.market_cap_rank || 'N/A'}</span>
                  </div>
                  <Link 
                    to={`/coin/${item.id}`}
                    className="mt-3 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  >
                    View details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Cryptocurrency Market</h1>

      <GlobalStats />
      
      <div className="my-6">
        <SearchBar 
          placeholder="Search cryptocurrencies..." 
          onSearch={(query) => console.log('Search from dashboard:', query)}
          className="max-w-lg mx-auto"
        />
      </div>

      {renderTrendingSection()}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top Cryptocurrencies</h2>
        
        {loading && coins.length === 0 ? (
          <div className="py-8">
            <LoadingSpinner className="mx-auto" />
          </div>
        ) : error ? (
          <ErrorMessage 
            message={error} 
            retry={fetchCoins}
            className="my-4"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {coins.slice(0, displayedCoins).map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
            
            {displayedCoins < coins.length && (
              <div className="mt-8 text-center">
                <button 
                  onClick={loadMore}
                  className="btn-primary"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;