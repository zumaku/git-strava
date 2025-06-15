// File: app/components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { Plus, Minus, GitCommitHorizontal } from 'lucide-react'; // Tambahkan ikon baru
import ContributionCalendar from './ContributionCalendar';

// Definisikan tipe data baru yang kita harapkan dari API
interface StatsData {
  totalContributions: number;
  totalAdditions: number;
  totalDeletions: number;
  calendarWeeks: any[];
  averageChangesPerDay: number; // Properti baru
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
    // TATA LETAK BARU: 2 KOLOM
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Kolom Kiri: berisi 3 Kartu Statistik */}
      <div className="flex flex-col gap-6">
        <StatCard title="Baris Ditambahkan" value={data.totalAdditions} Icon={Plus} />
        <StatCard title="Baris Dihapus" value={data.totalDeletions} Icon={Minus} />
        <StatCard 
          title="Rata-rata Perubahan per Hari" 
          value={Math.round(data.averageChangesPerDay)} // Kita bulatkan angkanya
          Icon={GitCommitHorizontal} 
        />
      </div>

      {/* Kolom Kanan: berisi Kalender Kontribusi */}
      <div className="flex">
        <ContributionCalendar weeks={data.calendarWeeks} />
      </div>
    </div>
  );
}