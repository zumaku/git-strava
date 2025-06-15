// File: app/components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { Plus, Minus } from 'lucide-react';
import ContributionCalendar from './ContributionCalendar';
import DailyActivityChart from './DailyActivityChart';

interface StatsData {
  totalContributions: number;
  totalAdditions: number;
  totalDeletions: number;
  calendarWeeks: any[];
  dailyStats: { date: string; perubahan: number }[];
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
    // INI BAGIAN UTAMA YANG DIPERBAIKI
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Kolom Kiri: berisi StatCard dan Kalender */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <StatCard title="Baris Ditambahkan" value={data.totalAdditions} Icon={Plus} />
        <StatCard title="Baris Dihapus" value={data.totalDeletions} Icon={Minus} />
        <ContributionCalendar weeks={data.calendarWeeks} />
      </div>

      {/* Kolom Kanan: berisi Grafik Aktivitas Harian */}
      <div className="lg:col-span-2">
        <DailyActivityChart data={data.dailyStats} />
      </div>
    </div>
  );
}