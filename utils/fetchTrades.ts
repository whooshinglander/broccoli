// utils/fetchTrades.ts
export const fetchTrades = async () => {
    const response = await fetch('/api/getTrades');
    if (!response.ok) throw new Error('Failed to fetch trades');
    return response.json();
  };
  