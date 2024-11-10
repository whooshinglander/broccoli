// components/trade-history-list.tsx
import { Trade } from '../lib/types';
import { formatNumber } from '../lib/formatters';

interface TradeHistoryListProps {
  trades: Trade[];
}

export default function TradeHistoryList({ trades }: TradeHistoryListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">Date</th>
            <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">Ticker</th>
            <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">Action</th>
            <th className="px-4 py-2 border-b text-right font-semibold text-gray-700">Volume</th>
            <th className="px-4 py-2 border-b text-right font-semibold text-gray-700">Price</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={trade.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2 border-b text-gray-700">{trade.date}</td>
              <td className="px-4 py-2 border-b text-gray-700">{trade.ticker}</td>
              <td className={`px-4 py-2 border-b font-medium ${trade.action === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                {trade.action.toUpperCase()}
              </td>
              <td className="px-4 py-2 border-b text-right text-gray-700">{formatNumber(trade.volume)}</td>
              <td className="px-4 py-2 border-b text-right text-gray-700">{formatNumber(trade.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
