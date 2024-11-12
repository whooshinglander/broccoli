// components/form/FormLayout.tsx
import { ReactNode } from 'react';

interface FormLayoutProps {
  title: string;
  children: ReactNode;
}

export function FormLayout({ title, children }: FormLayoutProps) {
  return (
    <div className="space-y-6 bg-white shadow-md rounded-lg p-6 max-w-md mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">{title}</h2>
      {children}
    </div>
  );
}
