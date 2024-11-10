import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Trade } from '../../lib/types';

const dataDirectory = path.join(process.cwd(), 'data', 'trades');

// Helper function to ensure directory exists
function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Helper function to add a trade and save it as an individual JSON file with UUID as filename
function addTrade(newTrade: Omit<Trade, 'id'>): Trade {
  ensureDirectoryExists(dataDirectory); // Ensure the directory exists
  const trade = { id: uuidv4(), ...newTrade };
  const filePath = path.join(dataDirectory, `${trade.id}.json`); // Filename is UUID.json

  try {
    fs.writeFileSync(filePath, JSON.stringify(trade, null, 2)); // Write trade data
    console.log(`File written successfully at: ${filePath}`);
  } catch (error) {
    console.error(`Failed to write file at: ${filePath}`, error);
    throw new Error("File write operation failed.");
  }

  return trade;
}

// Helper function to get all trades by reading each JSON file in the directory
function getAllTrades(): Trade[] {
  ensureDirectoryExists(dataDirectory); // Ensure the main data directory exists
  const files = fs.readdirSync(dataDirectory); // Read all JSON files
  const trades = files.map((file) => {
    const filePath = path.join(dataDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents) as Trade;
  });
  return trades;
}

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const trades = getAllTrades();
      res.status(200).json(trades);
    } catch (error) {
      console.error("Error in GET /api/trades:", error);
      res.status(500).json({ error: 'Failed to retrieve trades' });
    }
  } else if (req.method === 'POST') {
    try {
      const trade = addTrade(req.body);
      res.status(201).json(trade);
    } catch (error) {
      console.error("Error in POST /api/trades:", error);
      res.status(500).json({ error: 'Failed to save trade' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
