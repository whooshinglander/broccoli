// components/add-trade/AddTrade.tsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Autocomplete } from '../autocomplete/Autocomplete';

interface Trade {
  id: string;
  ticker: string;
  volume: number;
  price: number;
  action: 'buy' | 'sell';
  date: string;
}

interface AddTradeProps {
  onAdd: (trade: Trade) => void;
}

export function AddTrade({ onAdd }: AddTradeProps) {
  const [ticker, setTicker] = useState('');
  const [volume, setVolume] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle date change to ensure it's not in the future
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!ticker || volume === '' || price === '') {
      setIsSubmitting(false);
      return;
    }

    const id = uuidv4();

    const newTrade: Trade = {
      id,
      ticker,
      volume: Number(volume),
      price: Number(price),
      action,
      date,
    };

    await fetch('/api/saveTrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrade),
    });

    onAdd(newTrade);
    setTicker('');
    setVolume('');
    setPrice('');
    setAction('buy');
    setDate(new Date().toISOString().split('T')[0]);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Ticker</label>
        <Autocomplete value={ticker} onChange={setTicker} />
      </div>
      <div>
        <label>Volume</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          required
          className="input"
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="input"
        />
      </div>
      <div>
        <label>Action</label>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value as 'buy' | 'sell')}
          className="input"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]} // Restrict to dates up to today
          required
          className="input"
        />
      </div>
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Trade'}
      </button>
    </form>
  );
}
