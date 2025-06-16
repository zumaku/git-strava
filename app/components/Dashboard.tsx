// File: app/components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import ContributionCalendar from './ContributionCalendar';

// Definisikan tipe data yang kita harapkan dari API
interface StatsData {
  totalContributions: number;
  totalAdditions: number;
  totalDeletions: number;
  calendarWeeks: any[];
  averageChangesPerDay: number;
}

export default function Dashboard() {
  const [data, setData] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/github-stats');
        if (!response.ok) throw new Error('Gagal mengambil data statistik');
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <p className="text-white animate-pulse">Memuat statistik Anda...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return <p className="text-white">Tidak ada data untuk ditampilkan.</p>;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-fit">
      
      {/* Kolom Kiri: berisi 3 Kartu Statistik yang sudah diubah */}
      <div className="flex flex-col gap-6 w-full md:w-fit">
        <StatCard 
          title="LOC Additions" 
          value={`+${data.totalAdditions.toLocaleString()}`}
          valueColor="text-green-400"
        />
        <StatCard 
          title="LOC Deletions"
          value={`-${data.totalDeletions.toLocaleString()}`}
          valueColor="text-red-400"
        />
        <StatCard 
          title="Lines Changed / Day" 
          value={Math.round(data.averageChangesPerDay).toLocaleString()}
        />
      </div>

      {/* Kolom Kanan: berisi Kalender Kontribusi */}
      <div className="flex h-full">
        <ContributionCalendar weeks={data.calendarWeeks} />
      </div>
    </div>
  );
}