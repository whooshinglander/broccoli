// pages/trade-history.tsx
import { useEffect, useState } from 'react';
import TradeHistoryList from '../components/trade-history-list';
import { Trade } from '../lib/types';

export default function TradeHistoryPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const res = await fetch('/api/trades');
        if (!res.ok) throw new Error('Failed to fetch trades.');
        const data: Trade[] = await res.json();

        // Sort trades by date in descending order
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTrades(sortedData);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    }
    fetchTrades();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Trade History</h1>
      <TradeHistoryList trades={trades} />
    </div>
  );
}
