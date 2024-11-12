// pages/api/saveTrade.ts
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const tradeData = req.body;

    // Define the directory and unique filename
    const tradesDir = path.join(process.cwd(), 'data');
    const filename = path.join(tradesDir, `trade-${Date.now()}-${uuidv4()}.json`);

    // Ensure the directory exists
    if (!fs.existsSync(tradesDir)) {
      fs.mkdirSync(tradesDir);
    }

    // Write the trade data to an individual file
    fs.writeFileSync(filename, JSON.stringify(tradeData, null, 2));
    res.status(200).json({ message: 'Trade saved successfully', filename });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
