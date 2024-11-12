// pages/portfolioChart.tsx
import { useEffect, useState } from 'react';
import { PortfolioChart } from '../components/portfolio/PortfolioChart';
import { fetchTrades } from '../utils/fetchTrades';

export default function PortfolioChartPage() {
  const [trades, setTrades] = useState([]);
  const [dailyPrices, setDailyPrices] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const tradesData = await fetchTrades();
        setTrades(tradesData);

        const tickers = [...new Set(tradesData.map((trade) => trade.ticker))];
        const response = await fetch('/api/updateDailyPrices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tickers }),
        });

        if (response.ok) {
          const prices = await response.json();
          setDailyPrices(prices);
        } else {
          console.error('Failed to fetch daily prices');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Value Chart</h1>
      <PortfolioChart dailyPrices={dailyPrices} trades={trades} />
    </div>
  );
}
