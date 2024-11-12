// components/portfolio/Portfolio.tsx
import { useEffect, useState } from 'react';
import { Trade } from '../../lib/types';

interface PortfolioItem {
  ticker: string;
  totalVolume: number;
  averagePrice: number;
  currentPrice?: number;
  pnl?: number | null;
}

interface PortfolioProps {
  trades: Trade[];
  cachedPrices: { [key: string]: number };
}

export function Portfolio({ trades, cachedPrices }: PortfolioProps) {
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const calculatePortfolio = trades.reduce((acc, trade) => {
      if (!trade.ticker) return acc;

      if (!acc[trade.ticker]) {
        acc[trade.ticker] = {
          ticker: trade.ticker,
          totalVolume: 0,
          weightedPriceSum: 0,
        };
      }

      acc[trade.ticker].totalVolume += trade.volume;
      acc[trade.ticker].weightedPriceSum += trade.price * trade.volume;

      return acc;
    }, {} as Record<string, { ticker: string; totalVolume: number; weightedPriceSum: number }>);

    const portfolioData = Object.values(calculatePortfolio).map((item) => {
      const ticker = item.ticker;
      const averagePrice = item.weightedPriceSum / item.totalVolume;
      const currentPrice = cachedPrices[ticker] ?? 0;
      const pnl = currentPrice ? (currentPrice - averagePrice) * item.totalVolume : null;

      return {
        ticker,
        totalVolume: item.totalVolume,
        averagePrice,
        currentPrice,
        pnl,
      };
    });

    setPortfolioSummary(portfolioData);
  }, [trades, cachedPrices]); // Depend on trades and cachedPrices to refresh data

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Portfolio Summary</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Ticker</th>
            <th className="border border-gray-200 px-4 py-2">Total Volume</th>
            <th className="border border-gray-200 px-4 py-2">Average Price</th>
            <th className="border border-gray-200 px-4 py-2">Current Price</th>
            <th className="border border-gray-200 px-4 py-2">PnL</th>
          </tr>
        </thead>
        <tbody>
          {portfolioSummary.map((item) => (
            <tr key={item.ticker}>
              <td className="border border-gray-200 px-4 py-2">{item.ticker}</td>
              <td className="border border-gray-200 px-4 py-2">{item.totalVolume}</td>
              <td className="border border-gray-200 px-4 py-2">${item.averagePrice.toFixed(2)}</td>
              <td className="border border-gray-200 px-4 py-2">
                ${item.currentPrice?.toFixed(2) ?? 'N/A'}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {item.pnl !== null ? `$${item.pnl.toFixed(2)}` : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
