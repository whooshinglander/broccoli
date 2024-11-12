// components/add-trade/AddTradeFormLayout.tsx
import { ReactNode } from 'react';

interface AddTradeFormLayoutProps {
  title: string;
  isSubmitting: boolean;
  children: ReactNode;
}

export function AddTradeFormLayout({ title, isSubmitting, children }: AddTradeFormLayoutProps) {
  return (
    <div className="space-y-6 bg-white shadow-md rounded-lg p-6 max-w-md mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">{title}</h2>
      {children}
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Trade'}
      </button>
    </div>
  );
}
