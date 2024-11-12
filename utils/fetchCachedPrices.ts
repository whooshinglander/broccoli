// utils/fetchTrades.ts
import fs from 'fs';
import path from 'path';
import { Trade } from '../lib/types';

const TRADES_DIRECTORY = path.join(process.cwd(), 'data', 'trades');

export const fetchTrades = async (): Promise<Trade[]> => {
  try {
    const files = fs.readdirSync(TRADES_DIRECTORY);

    const trades = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const filePath = path.join(TRADES_DIRECTORY, file);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        try {
          const trade = JSON.parse(fileContents) as Trade;

          // Validate the structure of the trade object
          if (!trade.id || !trade.ticker || typeof trade.price !== 'number' || typeof trade.volume !== 'number') {
            console.warn(`Invalid trade format in file: ${file}`);
            return null;
          }

          return trade;
        } catch (error) {
          console.warn(`Error parsing file ${file}:`, error);
          return null;
        }
      })
      .filter((trade) => trade !== null) as Trade[];

    return trades;
  } catch (error) {
    console.error('Error fetching trades:', error);
    return [];
  }
};
