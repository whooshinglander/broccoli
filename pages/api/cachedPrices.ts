// pages/api/cachedPrices.ts
import fs from 'fs';
import path from 'path';
import yahooFinance from 'yahoo-finance2';
import { NextApiRequest, NextApiResponse } from 'next';

const CACHE_FILE_PATH = path.join(process.cwd(), 'data', 'cachedprice', 'prices.json');

const readCache = (): { [key: string]: { price: number; lastUpdated: number } } => {
  if (!fs.existsSync(CACHE_FILE_PATH)) {
    return {};
  }
  const fileData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
  return JSON.parse(fileData);
};

const writeCache = (cache: { [key: string]: { price: number; lastUpdated: number } }) => {
  fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(cache, null, 2));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tickers } = req.query;
  if (!tickers || typeof tickers !== 'string') {
    res.status(400).json({ error: 'Tickers query parameter is required' });
    return;
  }

  const tickerList = tickers.split(',');
  const cache = readCache();
  const newTickers = tickerList.filter((ticker) => !cache[ticker] || Date.now() - cache[ticker].lastUpdated > 24 * 60 * 60 * 1000);

  if (newTickers.length > 0) {
    try {
      for (const ticker of newTickers) {
        const result = await yahooFinance.quoteSummary(ticker, { modules: ['price'] });
        const price = result.price?.regularMarketPrice;

        if (price) {
          cache[ticker] = { price, lastUpdated: Date.now() };
        }
      }
      writeCache(cache); // Save the updated cache with new tickers
    } catch (error) {
      console.error('Error fetching prices:', error);
      res.status(500).json({ error: 'Failed to fetch new ticker prices' });
      return;
    }
  }

  // Return the cached prices, including any new additions
  const responsePrices = tickerList.reduce((acc, ticker) => {
    if (cache[ticker]) {
      acc[ticker] = cache[ticker].price;
    }
    return acc;
  }, {} as { [key: string]: number });

  res.status(200).json(responsePrices);
}
