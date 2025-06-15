// File: app/components/StatCard.tsx
'use client';

import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  Icon: LucideIcon;
  className?: string;
}

export default function StatCard({ title, value, Icon, className }: StatCardProps) {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3 text-gray-400">
        <Icon size={18} />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-white">{value.toLocaleString()}</p>
    </div>
  );
}