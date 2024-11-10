// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import AddTradeForm from '../components/add-trade-form';
import TradeSummaryTable from '../components/trade-summary-table';
import TradeHistoryList from '../components/trade-history-list';
import { Trade } from '../lib/types';

export default function Dashboard() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Fetch trades when the component mounts
    async function fetchTrades() {
      try {
        const res = await fetch('/api/trades');
        if (!res.ok) throw new Error('Failed to fetch trades.');
        const data: Trade[] = await res.json();
        setTrades(data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    }
    fetchTrades();
  }, []);

  const handleAddTrade = (trade: Omit<Trade, 'id'>) => {
    // Add a new trade to the list (optimistic update)
    setTrades((prevTrades) => [...prevTrades, { ...trade, id: Date.now().toString() }]);
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Add Trade Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Add Trade</h2>
        <AddTradeForm onSubmit={handleAddTrade} />
      </section>

      {/* Trade Summary Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trade Summary</h2>
        <TradeSummaryTable trades={trades} />
      </section>

      {/* Trade History List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trade History</h2>
        <TradeHistoryList trades={trades} />
      </section>
    </div>
  );
}
