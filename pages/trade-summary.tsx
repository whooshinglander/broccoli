// pages/trade-summary.tsx
import { useEffect, useState } from 'react';
import TradeSummaryTable from '../components/trade-summary-table';
import { Trade } from '../lib/types';

export default function TradeSummaryPage() {
  const [trades, setTrades] = useState<Trade[]>([]); // Initialize with empty array

  useEffect(() => {
    async function fetchTrades() {
      try {
        const res = await fetch('/api/trades');
        if (!res.ok) throw new Error("Failed to fetch trades.");
        const data: Trade[] = await res.json();
        setTrades(data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    }
    fetchTrades();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Trade Summary</h1>
      <TradeSummaryTable trades={trades} /> {/* Pass the trades array */}
    </div>
  );
}
