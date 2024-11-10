// components/add-trade-form.tsx
import { useState } from 'react';
import { Trade } from '../lib/types';
import styles from '../styles/form.module.css';

interface AddTradeFormProps {
  onSubmit: (tradeData: Omit<Trade, 'id'>) => void;
}

export default function AddTradeForm({ onSubmit }: AddTradeFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    ticker: '',
    action: 'buy' as 'buy' | 'sell',
    volume: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      volume: parseFloat(formData.volume.toString()),
      price: parseFloat(formData.price.toString()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles['form-container']}>
      <h2 className={styles['form-heading']}>Add Trade</h2>
      
      <div className={styles['form-group']}>
        <label className={styles.label}>Date</label>
        <input 
          name="date" 
          type="date" 
          onChange={handleChange} 
          required 
          className={styles.input}
        />
      </div>

      <div className={styles['form-group']}>
        <label className={styles.label}>Ticker</label>
        <input 
          name="ticker" 
          placeholder="Enter ticker symbol" 
          onChange={handleChange} 
          required 
          className={styles.input}
        />
      </div>

      <div className={styles['form-group']}>
        <label className={styles.label}>Action</label>
        <select 
          name="action" 
          onChange={handleChange} 
          className={styles.input}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>

      <div className={styles['form-group']}>
        <label className={styles.label}>Volume</label>
        <input 
          name="volume" 
          type="number" 
          step="0.0001" 
          placeholder="Volume (up to 4 decimal places)" 
          onChange={handleChange} 
          required 
          className={styles.input}
        />
      </div>

      <div className={styles['form-group']}>
        <label className={styles.label}>Price</label>
        <input 
          name="price" 
          type="number" 
          step="0.0001" 
          placeholder="Price (up to 4 decimal places)" 
          onChange={handleChange} 
          required 
          className={styles.input}
        />
      </div>

      <button 
        type="submit" 
        className={styles.button}
      >
        Add Trade
      </button>
    </form>
  );
}
