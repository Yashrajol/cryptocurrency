import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import CoinDetails from './pages/CoinDetails';
import Watchlist from './pages/Watchlist';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { useCrypto } from './hooks/useCrypto';

function App() {
  const { fetchTrendingCoins, fetchMarketData } = useCrypto();

  useEffect(() => {
    fetchTrendingCoins();
    fetchMarketData();
    
    // Refresh market data every 60 seconds
    const intervalId = setInterval(() => {
      fetchMarketData();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [fetchTrendingCoins, fetchMarketData]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;