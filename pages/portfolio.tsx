// pages/portfolio.tsx
import { useEffect, useState } from 'react';
import { Portfolio } from '../components/portfolio/Portfolio';
import { fetchTrades } from '../utils/fetchTrades';
import { Trade } from '../lib/types';

export default function PortfolioPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [cachedPrices, setCachedPrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const tradesData = await fetchTrades();
        setTrades(tradesData);

        const tickers = tradesData.map((trade) => trade.ticker).join(',');
        const response = await fetch(`/api/cachedPrices?tickers=${tickers}`);

        if (!response.ok) throw new Error('Failed to fetch cached prices');

        const prices = await response.json();
        setCachedPrices(prices);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading portfolio...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Portfolio Summary</h1>
      <Portfolio trades={trades} cachedPrices={cachedPrices} />
    </div>
  );
}
