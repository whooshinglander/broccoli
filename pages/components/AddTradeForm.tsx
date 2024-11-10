import { useState, useRef, useEffect } from 'react';

interface TickerSearchProps {
  onSelect: (ticker: string) => void;
}

export default function TickerSearch({ onSelect }: TickerSearchProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sample ticker data - replace with your actual data source
  const tickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA'];

  useEffect(() => {
    // Add click outside listener
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    setIsOpen(true);
    
    if (value.trim()) {
      const filtered = tickers.filter(ticker => 
        ticker.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (ticker: string) => {
    setSearch(ticker);
    onSelect(ticker);
    setIsOpen(false);
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[0]);
      e.preventDefault();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => search.trim() && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Enter ticker symbol"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
      />
      
      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((ticker) => (
            <li
              key={ticker}
              onClick={() => handleSelect(ticker)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {ticker}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}