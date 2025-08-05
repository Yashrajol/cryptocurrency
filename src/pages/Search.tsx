import React, { useState, useEffect } from 'react';
import { useCrypto } from '../hooks/useCrypto';
import SearchBar from '../components/search/SearchBar';
import CoinCard from '../components/coin/CoinCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom';

const Search: React.FC = () => {
  const { 
    coins, 
    searchResults, 
    searchCryptoCoins, 
    fetchCoins,
    loading, 
    error 
  } = useCrypto();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (coins.length === 0) {
      fetchCoins(1, 100);
    }
  }, [coins.length, fetchCoins]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchCryptoCoins(query);
  };

  // Filter coins based on search results
  const filteredCoins = searchQuery 
    ? coins.filter(coin => 
        searchResults?.coins?.some((result: any) => result.id === coin.id)
      )
    : coins;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Search Cryptocurrencies</h1>
      
      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search by name or symbol..."
          className="max-w-lg mx-auto"
        />
      </div>

      {loading && (
        <div className="py-8 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <ErrorMessage 
          message={error}
          retry={() => searchCryptoCoins(searchQuery)} 
          className="max-w-lg mx-auto mb-8"
        />
      )}

      {!loading && searchQuery && searchResults?.coins?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-xl mb-2">No results found for "{searchQuery}"</p>
          <p className="text-slate-500 dark:text-slate-400">Try a different search term</p>
        </div>
      )}

      {!loading && filteredCoins.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      {!searchQuery && !loading && (
        <div className="bg-white dark:bg-background-card rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['bitcoin', 'ethereum', 'solana', 'cardano', 'dogecoin', 'shiba'].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;