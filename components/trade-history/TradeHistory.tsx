// components/trade-history/TradeHistory.tsx
import { Trade } from '../../lib/types';

interface TradeHistoryProps {
  trades: Trade[];
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Trade History</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Date</th>
            <th className="border border-gray-200 px-4 py-2">Ticker</th>
            <th className="border border-gray-200 px-4 py-2">Action</th>
            <th className="border border-gray-200 px-4 py-2">Price</th>
            <th className="border border-gray-200 px-4 py-2">Volume</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td className="border border-gray-200 px-4 py-2">{new Date(trade.date).toLocaleDateString()}</td>
              <td className="border border-gray-200 px-4 py-2">{trade.ticker}</td>
              <td className="border border-gray-200 px-4 py-2">{trade.action}</td>
              <td className="border border-gray-200 px-4 py-2">${trade.price.toFixed(2)}</td>
              <td className="border border-gray-200 px-4 py-2">{trade.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
