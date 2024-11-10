// pages/api/searchTicker.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  try {
    const results = await yahooFinance.search(query);
    res.status(200).json(results.quotes); // Return only 'quotes' part of the search result
  } catch (error) {
    console.error('Error fetching ticker search results:', error);
    res.status(500).json({ error: 'Failed to fetch ticker information' });
  }
}
