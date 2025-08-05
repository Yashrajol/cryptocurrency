import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCrypto } from '../hooks/useCrypto';
import CoinChart from '../components/coin/CoinChart';
import TimeframeSelector from '../components/common/TimeframeSelector';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Star, TrendingUp, TrendingDown, Globe, Twitter, ExternalLink, BarChart3 } from 'lucide-react';
import { formatCurrency, formatPercentage, formatCompactNumber, formatDate } from '../utils/formatters';

const CoinDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    selectedCoin, 
    chartData, 
    watchlist,
    loading, 
    error,
    fetchCoinDetails, 
    fetchCoinChartData,
    addToWatchlist,
    removeFromWatchlist
  } = useCrypto();
  
  const [timeframe, setTimeframe] = useState<number>(7);
  
  useEffect(() => {
    if (id) {
      fetchCoinDetails(id);
      fetchCoinChartData(id, timeframe);
    }
  }, [id, timeframe, fetchCoinDetails, fetchCoinChartData]);
  
  const handleTimeframeChange = (days: number) => {
    setTimeframe(days);
  };
  
  const isInWatchlist = id ? watchlist.includes(id) : false;
  
  const toggleWatchlist = () => {
    if (!id) return;
    
    if (isInWatchlist) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(id);
    }
  };
  
  const timeframeOptions = [
    { value: 1, label: '24h' },
    { value: 7, label: '7d' },
    { value: 30, label: '30d' },
    { value: 90, label: '90d' },
    { value: 365, label: '1y' },
    { value: 'max', label: 'All' } as unknown as { value: number, label: string },
  ];

  if (loading && !selectedCoin) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage 
          message={error} 
          retry={() => id && fetchCoinDetails(id)}
          className="max-w-lg mx-auto"
        />
        <div className="mt-6 text-center">
          <Link to="/" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedCoin) {
    return null;
  }

  // Extract key data
  const { 
    name, 
    symbol, 
    market_data,
    description,
    links,
    market_cap_rank,
    image,
  } = selectedCoin;

  const currentPrice = market_data.current_price.usd;
  const priceChangePercentage = market_data.price_change_percentage_24h;
  const isPriceUp = priceChangePercentage >= 0;
  const marketCap = market_data.market_cap.usd;
  const volume = market_data.total_volume.usd;
  const circulatingSupply = market_data.circulating_supply;
  const totalSupply = market_data.total_supply;
  const maxSupply = market_data.max_supply;

  // Calculate supply percentages
  const supplyPercentage = totalSupply 
    ? (circulatingSupply / totalSupply) * 100 
    : maxSupply 
      ? (circulatingSupply / maxSupply) * 100 
      : 100;

  return (
    <div>
      <div className="mb-8">
        <Link to="/" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-background-card rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img 
              src={image.large} 
              alt={`${name} logo`} 
              className="w-12 h-12 rounded-full" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{name}</h1>
                <span className="text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded uppercase">
                  {symbol}
                </span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                  Rank #{market_cap_rank}
                </span>
              </div>
              <div className="flex items-center mt-1 space-x-3">
                {links.homepage[0] && (
                  <a 
                    href={links.homepage[0]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-primary-500 text-sm flex items-center"
                  >
                    <Globe size={14} className="mr-1" />
                    Website
                  </a>
                )}
                {links.twitter_screen_name && (
                  <a 
                    href={`https://twitter.com/${links.twitter_screen_name}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-primary-500 text-sm flex items-center"
                  >
                    <Twitter size={14} className="mr-1" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={toggleWatchlist}
            className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
              isInWatchlist 
                ? 'bg-warning-50 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400 border border-warning-200 dark:border-warning-800' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Star size={16} fill={isInWatchlist ? "currentColor" : "none"} />
            {isInWatchlist ? 'Watchlisted' : 'Add to Watchlist'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mb-6">
          <div className="text-3xl font-bold">
            {formatCurrency(currentPrice)}
          </div>
          <div 
            className={`flex items-center text-sm font-medium ${
              isPriceUp ? 'price-up' : 'price-down'
            }`}
          >
            {isPriceUp ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            {formatPercentage(priceChangePercentage)} (24h)
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Price Chart</h2>
            <TimeframeSelector 
              options={timeframeOptions} 
              selected={timeframe}
              onChange={handleTimeframeChange}
            />
          </div>
          
          {chartData ? (
            <CoinChart 
              chartData={chartData} 
              coinName={name} 
              days={timeframe}
            />
          ) : (
            <div className="h-80 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md">
            <h3 className="text-xs text-slate-500 dark:text-slate-400 mb-1">Market Cap</h3>
            <p className="font-medium">{formatCurrency(marketCap, 0)}</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md">
            <h3 className="text-xs text-slate-500 dark:text-slate-400 mb-1">Trading Volume (24h)</h3>
            <p className="font-medium">{formatCurrency(volume, 0)}</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md">
            <h3 className="text-xs text-slate-500 dark:text-slate-400 mb-1">Circulating Supply</h3>
            <p className="font-medium">
              {formatCompactNumber(circulatingSupply)} {symbol.toUpperCase()}
            </p>
            {(totalSupply || maxSupply) && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>{formatCompactNumber(circulatingSupply)}</span>
                  <span>{formatCompactNumber(totalSupply || maxSupply || 0)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                  <div 
                    className="bg-primary-500 h-1.5 rounded-full" 
                    style={{ width: `${supplyPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-background-card rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">About {name}</h2>
            {description?.en ? (
              <div 
                className="prose dark:prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: description.en }}
              />
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No description available.</p>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-background-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Price Change (24h)</span>
                <span className={isPriceUp ? 'price-up' : 'price-down'}>
                  {formatPercentage(priceChangePercentage)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">All-Time High</span>
                <div className="text-right">
                  <div>{formatCurrency(market_data.ath.usd)}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(market_data.ath_date.usd)}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">All-Time Low</span>
                <div className="text-right">
                  <div>{formatCurrency(market_data.atl.usd)}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(market_data.atl_date.usd)}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Market Cap Rank</span>
                <span>#{market_cap_rank}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Market Cap</span>
                <span>{formatCurrency(marketCap, 0)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Volume / Market Cap</span>
                <span>{(volume / marketCap).toFixed(4)}</span>
              </div>
              
              {links.blockchain_site && links.blockchain_site[0] && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <a
                    href={links.blockchain_site[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-500 hover:text-primary-600"
                  >
                    <BarChart3 size={16} />
                    <span>View on Blockchain Explorer</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;