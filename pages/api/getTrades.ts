// pages/api/getTrades.ts
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Trade } from '../../lib/types';

const TRADES_DIRECTORY = path.join(process.cwd(), 'data', 'trades');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const files = fs.readdirSync(TRADES_DIRECTORY);

    const trades = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const filePath = path.join(TRADES_DIRECTORY, file);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContents) as Trade;
      });

    res.status(200).json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
}
