// pages/api/searchTicker.ts

import yahooFinance from 'yahoo-finance2';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  try {
    const searchResults = await yahooFinance.search(query, { lang: 'en-US' });
    res.status(200).json(searchResults.quotes); // returns an array of tickers and symbols
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
