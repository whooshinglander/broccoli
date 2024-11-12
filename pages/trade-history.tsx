// pages/trade-history.tsx
import TradeHistoryList from '../components/trade-history-list';

export default function TradeHistoryPage() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Trade History</h1>
      <TradeHistoryList />
    </div>
  );
}
