// components/portfolio/PortfolioChart.tsx
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface PortfolioChartProps {
  dailyPrices: { [ticker: string]: { date: string; close: number }[] };
  trades: { ticker: string; volume: number }[];
}

export function PortfolioChart({ dailyPrices, trades }: PortfolioChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    const portfolioValues: { [date: string]: number } = {};

    trades.forEach((trade) => {
      const prices = dailyPrices[trade.ticker];
      
      if (!Array.isArray(prices)) {
        console.warn(`No valid price data array available for ticker: ${trade.ticker}`);
        return;
      }

      prices.forEach((priceData) => {
        const { date, close } = priceData;
        const stockValue = close * trade.volume;
        portfolioValues[date] = (portfolioValues[date] || 0) + stockValue;
      });
    });

    const sortedDates = Object.keys(portfolioValues).sort();
    setLabels(sortedDates);
    setDataPoints(sortedDates.map((date) => portfolioValues[date]));

    if (labels.length === 0 || dataPoints.length === 0) {
      console.error("Labels and data points are not set up correctly");
    }

  }, [dailyPrices, trades]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Portfolio Value',
        data: dataPoints,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Total Value ($)' } },
    },
  };

  return (
    <div style={{ minHeight: "300px", minWidth: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
}
