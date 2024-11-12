// lib/types.ts
export interface Trade {
  id: string;
  ticker: string;
  price: number;
  volume: number;
  action: 'buy' | 'sell';
  date: string;
}
