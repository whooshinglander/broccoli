// components/TickerSearch.tsx
import { useState, useEffect } from 'react';

interface TickerSearchProps {
  onSelect: (ticker: string) => void;
}

export default function TickerSearch({ onSelect }: TickerSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchTickers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/searchTicker?query=${query}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching ticker search results:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickers();
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex === 0 ? results.length - 1 : prevIndex - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        handleSelect(results[activeIndex].symbol);
      }
    }
  };

  const handleSelect = (ticker: string) => {
    setQuery(ticker); // Set the selected ticker in the input
    setResults([]); // Clear results to close dropdown
    setActiveIndex(-1); // Reset active index
    onSelect(ticker); // Pass selected ticker to parent
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1); // Reset active index on input change
        }}
        onKeyDown={handleKeyDown} // Attach keydown event handler
        placeholder="Search for ticker"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
      />
      {isLoading && <p className="text-gray-500 mt-1">Loading...</p>}
      {results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto shadow-lg">
          {results.map((result, index) => (
            <li
              key={result.symbol}
              onMouseUp={() => handleSelect(result.symbol)} // Use onMouseUp to select before blur
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeIndex ? 'bg-blue-100' : ''
              }`}
            >
              {result.symbol} - {result.shortname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
