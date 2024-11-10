// lib/db.ts
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Trade } from './types';

const dataFilePath = path.join(process.cwd(), 'data', 'trades.json');

export function getAllTrades(): Trade[] {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data) as Trade[];
}

export function addTrade(newTrade: Omit<Trade, 'id'>): Trade {
  const trades = getAllTrades();
  const trade = { id: uuidv4(), ...newTrade };
  trades.push(trade);
  fs.writeFileSync(dataFilePath, JSON.stringify(trades, null, 2));
  return trade;
}
