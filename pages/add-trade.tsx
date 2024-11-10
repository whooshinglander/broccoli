// pages/add-trade.tsx
import AddTradeForm from '../components/add-trade-form';
import { Trade } from '../lib/types';

export default function AddTradePage() {
  const handleAddTrade = async (tradeData: Omit<Trade, 'id'>) => {
    await fetch('/api/trades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tradeData),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Add Trade</h1>
      <AddTradeForm onSubmit={handleAddTrade} />
    </div>
  );
}
