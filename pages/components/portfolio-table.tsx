// components/portfolio-table.tsx
import { useEffect, useState } from 'react';
import { Trade } from '../lib/types';
import { formatNumber } from '../lib/formatters';

interface TradeSummaryTableProps {
  trades: Trade[];
}

export default function TradeSummaryTable({ trades }: TradeSummaryTableProps) {
  // Calculate summary data grouped by ticker
  const summary = trades.reduce((acc, trade) => {
    const { ticker, volume, price } = trade;
    if (!acc[ticker]) {
      acc[ticker] = { totalVolume: 0, totalCost: 0, initialPrice: price };
    }
    acc[ticker].totalVolume += Number(volume);
    acc[ticker].totalCost += Number(volume) * Number(price);
    return acc;
  }, {} as Record<string, { totalVolume: number; totalCost: number; initialPrice: number }>);

  // Prepare summary data with PnL and formatted values
  const formattedSummary = Object.entries(summary).map(([ticker, { totalVolume, totalCost, initialPrice }]) => {
    const averagePrice = totalVolume > 0 ? totalCost / totalVolume : 0;
    const pnl = (initialPrice - averagePrice) * totalVolume; // Calculate PnL based on initial price

    return {
      ticker,
      totalVolume: formatNumber(totalVolume),
      averagePrice: formatNumber(averagePrice),
      initialPrice: formatNumber(initialPrice),
      pnl: formatNumber(pnl),
    };
  });

  return (
    <div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Ticker</th>
            <th className="border p-2">Volume</th>
            <th className="border p-2">Average Price</th>
            <th className="border p-2">Initial Price</th>
            <th className="border p-2">PnL</th>
          </tr>
        </thead>
        <tbody>
          {formattedSummary.map(({ ticker, totalVolume, averagePrice, initialPrice, pnl }) => (
            <tr key={ticker}>
              <td className="border p-2">{ticker}</td>
              <td className="border p-2">{totalVolume}</td>
              <td className="border p-2">{averagePrice}</td>
              <td className="border p-2">{initialPrice}</td>
              <td className={`border p-2 ${parseFloat(pnl) >= 0 ? 'text-green-600' : 'text-red-600'}`}>{pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
