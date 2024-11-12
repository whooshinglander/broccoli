// components/portfolio/PortfolioLayout.tsx
import { ReactNode } from 'react';

interface PortfolioLayoutProps {
  title: string;
  children: ReactNode;
}

export function PortfolioLayout({ title, children }: PortfolioLayoutProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto bg-white p-4 border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border-b text-left">Ticker</th>
              <th className="py-2 px-4 border-b text-right">Total Volume</th>
              <th className="py-2 px-4 border-b text-right">Average Price</th>
              <th className="py-2 px-4 border-b text-right">Current Price</th>
              <th className="py-2 px-4 border-b text-right">PnL</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
