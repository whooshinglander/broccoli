// components/autocomplete/Autocomplete.tsx
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import styles from './Autocomplete.module.css';

interface SearchResult {
  symbol: string;
  shortname: string;
}

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export function Autocomplete({ value, onChange }: AutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const fetchSuggestions = async (value: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<SearchResult[]>(`/api/searchTicker?query=${value}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 200), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
    if (newValue.length > 1) {
      debouncedFetchSuggestions(newValue);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        selectSuggestion(suggestions[selectedIndex]);
      }
    }
  };

  const selectSuggestion = (suggestion: SearchResult) => {
    onChange(suggestion.symbol);
    setQuery(suggestion.symbol); // Update input with selected suggestion
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a stock ticker"
        className="input-class"
      />
      {isLoading && <div className={styles.loadingIndicator}>Loading...</div>}
      {suggestions.length > 0 && (
        <ul className={styles.autocompleteDropdown}>
          {suggestions.map((result, index) => (
            <li
              key={result.symbol}
              className={`${styles.listItem} ${index === selectedIndex ? styles.highlighted : ''}`}
              onClick={() => selectSuggestion(result)}
            >
              {result.symbol} - {result.shortname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
