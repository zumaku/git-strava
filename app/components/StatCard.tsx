// File: app/components/StatCard.tsx
'use client';

import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  Icon?: LucideIcon; // Ikon sekarang opsional (ditandai dengan '?')
  valueColor?: string; // Properti baru untuk warna teks nilai
}

export default function StatCard({ title, value, Icon, valueColor = 'text-white' }: StatCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col gap-2">
      <div className="flex items-center gap-3 text-gray-400">
        {/* Ikon hanya akan ditampilkan jika diberikan */}
        {Icon && <Icon size={18} />}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      {/* Terapkan warna kustom pada nilai, dengan default 'text-white' */}
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}