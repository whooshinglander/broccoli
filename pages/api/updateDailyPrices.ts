import fs from 'fs';
import path from 'path';
import yahooFinance from 'yahoo-finance2';
import { NextApiRequest, NextApiResponse } from 'next';

const DAILY_PRICES_PATH = path.join(process.cwd(), 'data', 'daily-prices.json');

// Helper function to read daily prices from the JSON file
const readDailyPrices = (): { [key: string]: { [date: string]: number } } => {
  if (!fs.existsSync(DAILY_PRICES_PATH)) return {};
  return JSON.parse(fs.readFileSync(DAILY_PRICES_PATH, 'utf-8'));
};

// Helper function to write daily prices to the JSON file
const writeDailyPrices = (prices: { [key: string]: { [date: string]: number } }) => {
  fs.writeFileSync(DAILY_PRICES_PATH, JSON.stringify(prices, null, 2));
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tickers } = req.body; // Expecting an array of tickers from the request body
  if (!tickers || !Array.isArray(tickers)) {
    return res.status(400).json({ message: 'Invalid tickers provided' });
  }

  const dailyPrices = readDailyPrices();
  const today = new Date().toISOString().split('T')[0];

  try {
    for (const ticker of tickers) {
      if (!dailyPrices[ticker]) dailyPrices[ticker] = {};

      // Check if today's price is missing for the ticker
      if (!dailyPrices[ticker][today]) {
        const result = await yahooFinance.historical(ticker, {
          period1: '2024-01-01',
          interval: '1d',
        });
        result.forEach(({ date, close }) => {
          const dateString = date.toISOString().split('T')[0];
          if (!dailyPrices[ticker][dateString]) {
            dailyPrices[ticker][dateString] = close;
          }
        });
      }
    }

    // Save updated prices to the file
    writeDailyPrices(dailyPrices);
    res.status(200).json(dailyPrices);
  } catch (error) {
    console.error('Error fetching daily prices:', error);
    res.status(500).json({ error: 'Failed to fetch daily prices' });
  }
}
