// pages/api/saveTrade.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const newTrade = req.body;

  // Add a timestamp to the trade data for internal reference (not displayed elsewhere)
  const tradeWithTimestamp = {
    ...newTrade,
    timestamp: new Date().toISOString(),
  };

  const tradesDirectory = path.join(process.cwd(), 'data/trades');
  if (!fs.existsSync(tradesDirectory)) {
    fs.mkdirSync(tradesDirectory, { recursive: true });
  }

  const fileName = `${newTrade.id}.json`; // Use the trade ID as the file name
  const filePath = path.join(tradesDirectory, fileName);

  fs.writeFileSync(filePath, JSON.stringify(tradeWithTimestamp, null, 2));

  res.status(200).json({ message: 'Trade saved successfully' });
}
