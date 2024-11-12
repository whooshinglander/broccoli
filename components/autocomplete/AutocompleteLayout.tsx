// components/autocomplete/AutocompleteLayout.tsx
import { ReactNode } from 'react';

interface AutocompleteLayoutProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  children: ReactNode;
  showDropdown: boolean;
}

export function AutocompleteLayout({
  inputValue,
  onInputChange,
  onInputKeyDown,
  isLoading,
  children,
  showDropdown,
}: AutocompleteLayoutProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        placeholder="Search for a stock ticker"
        className="mt-1 block w-full border border-gray-300 border-b-0 rounded-md bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
      />
      {isLoading && <div className="absolute right-2 top-2 text-gray-500">Loading...</div>}
      {showDropdown && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg">
          {children}
        </ul>
      )}
    </div>
  );
}
