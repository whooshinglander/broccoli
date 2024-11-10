// lib/types.ts
export interface Trade {
    id: string;
    date: string;
    ticker: string;
    action: 'buy' | 'sell';
    volume: number;
    price: number;
  }
  