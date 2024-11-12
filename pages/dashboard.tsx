// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AddTrade } from '../components/add-trade/AddTrade';
import { Portfolio } from '../components/portfolio/Portfolio';
import { TradeHistory } from '../components/trade-history/TradeHistory';
import { fetchTrades } from '../utils/fetchTrades';
import { Trade } from '../lib/types';

export default function Dashboard() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [cachedPrices, setCachedPrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tradesData = await fetchTrades();
        setTrades(tradesData);

        const tickers = tradesData.map((trade) => trade.ticker).join(',');
        const response = await fetch(`/api/cachedPrices?tickers=${tickers}`);

        if (response.ok) {
          const prices = await response.json();
          setCachedPrices(prices);
        } else {
          console.error('Failed to fetch cached prices');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddTrade = (newTrade: Trade) => {
    setTrades((prevTrades) => [...prevTrades, newTrade]);
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Link to Portfolio Chart */}
      <section>
        <Link href="/portfolioChart" className="text-blue-500 underline">
          View Portfolio Value Chart
        </Link>
      </section>

      {/* Add Trade Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Add New Trade</h2>
        <AddTrade onAdd={handleAddTrade} />
      </section>

      {/* Portfolio Summary Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Portfolio Summary</h2>
        <Portfolio trades={trades} cachedPrices={cachedPrices} />
      </section>

      {/* Trade History Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trade History</h2>
        <TradeHistory trades={trades} />
      </section>
    </div>
  );
}
