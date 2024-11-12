// components/form/TextInput.tsx
import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextInput({ label, ...props }: TextInputProps) {
  return (
    <label className="block mb-2">
      <span className="text-gray-800 font-medium mb-1">{label}</span>
      <input
        {...props}
        className="mt-1 block w-full border border-gray-300 rounded-md bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
      />
    </label>
  );
}
