// components/trade-history-list.tsx
import { useEffect, useState } from 'react';
import { Trade } from '../lib/types';

export default function TradeHistoryList() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const res = await fetch('/api/getTrades');
        if (!res.ok) throw new Error('Failed to fetch trades.');
        const data: Trade[] = await res.json();
        setTrades(data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    }
    fetchTrades();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Trade History</h2>
      <ul className="space-y-2">
        {trades.length > 0 ? (
          trades.map((trade) => (
            <li key={trade.id} className="border p-4 rounded">
              <p><strong>Action:</strong> {trade.action}</p>
              <p><strong>Ticker:</strong> {trade.ticker}</p>
              <p><strong>Price:</strong> ${trade.price}</p>
              <p><strong>Volume:</strong> {trade.volume}</p>
              <p><strong>Date:</strong> {new Date(trade.date).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No trades available</p>
        )}
      </ul>
    </div>
  );
}
