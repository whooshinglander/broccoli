// pages/porfolio.tsx
import { useEffect, useState } from 'react';
import TradeSummaryTable from '../components/portfolio-table';
import { Trade } from '../lib/types';

export default function TradeSummaryPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch trades when the component mounts
    async function fetchTrades() {
      try {
        const res = await fetch('/api/trades');
        if (!res.ok) throw new Error('Failed to fetch trades.');
        const data: Trade[] = await res.json();
        setTrades(data);
      } catch (err) {
        console.error('Error fetching trades:', err);
        setError('Could not fetch trade data.');
      }
    }
    fetchTrades();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Trade Summary</h1>
      {error && <p className="text-red-500">{error}</p>}
      <TradeSummaryTable trades={trades} />
    </div>
  );
}
