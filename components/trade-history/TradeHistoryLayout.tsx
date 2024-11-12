// components/trade-history/TradeHistoryLayout.tsx
import { ReactNode } from 'react';

interface TradeHistoryLayoutProps {
  title: string;
  children: ReactNode;
}

export function TradeHistoryLayout({ title, children }: TradeHistoryLayoutProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto bg-white p-4 border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Ticker</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
              <th className="py-2 px-4 border-b text-right">Volume</th>
              <th className="py-2 px-4 border-b text-right">Price</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
