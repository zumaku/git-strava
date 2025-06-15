// File: app/components/DailyActivityChart.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DailyActivityChartProps {
  data: { date: string; perubahan: number }[];
}

export default function DailyActivityChart({ data }: DailyActivityChartProps) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 h-80">
      <h3 className="text-lg font-bold text-white mb-4">Aktivitas Harian (Perubahan Baris)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
          <XAxis dataKey="date" stroke="#a0aec0" fontSize={12} />
          <YAxis stroke="#a0aec0" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Bar dataKey="perubahan" fill="#48bb78" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}