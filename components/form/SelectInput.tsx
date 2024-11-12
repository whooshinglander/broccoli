// components/form/SelectInput.tsx
import { SelectHTMLAttributes } from 'react';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function SelectInput({ label, children, ...props }: SelectInputProps) {
  return (
    <label className="block mb-2">
      <span className="text-gray-700">{label}</span>
      <select {...props} className="input mt-1 block w-full border rounded px-3 py-2">
        {children}
      </select>
    </label>
  );
}
