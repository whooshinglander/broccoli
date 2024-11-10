// components/trade-summary-table.tsx
import { Trade } from '../lib/types';
import { formatNumber } from '../lib/formatters';

interface TradeSummaryTableProps {
  trades?: Trade[];
}

export default function TradeSummaryTable({ trades = [] }: TradeSummaryTableProps) {
  // Calculate summary data grouped by ticker
  const summary = trades.reduce((acc, trade) => {
    const { ticker, volume, price } = trade;
    if (!acc[ticker]) {
      acc[ticker] = { totalVolume: 0, totalCost: 0 };
    }
    acc[ticker].totalVolume += Number(volume);
    acc[ticker].totalCost += Number(volume) * Number(price);
    return acc;
  }, {} as Record<string, { totalVolume: number; totalCost: number }>);

  // Prepare summary data for display with formatted values
  const formattedSummary = Object.entries(summary).map(([ticker, { totalVolume, totalCost }]) => ({
    ticker,
    totalVolume: formatNumber(totalVolume), // Format with commas and two decimal places
    averagePrice: totalVolume > 0 ? formatNumber(totalCost / totalVolume) : '0.00', // Format with commas and two decimal places
  }));

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">Ticker</th>
          <th className="border p-2">Volume</th>
          <th className="border p-2">Average Price</th>
        </tr>
      </thead>
      <tbody>
        {formattedSummary.map(({ ticker, totalVolume, averagePrice }) => (
          <tr key={ticker}>
            <td className="border p-2">{ticker}</td>
            <td className="border p-2">{totalVolume}</td>
            <td className="border p-2">{averagePrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}