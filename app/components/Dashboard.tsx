// File: app/components/Dashboard.tsx
'use client';

import { useState, useEffect, useRef } from 'react'; // Import useRef
import StatCard from './StatCard';
import ContributionCalendar from './ContributionCalendar';
import html2canvas from 'html2canvas'; // Import library
import ShareableImage from './ShareableImage'; // Import komponen gambar kita
import { useSession } from 'next-auth/react'; // Import useSession untuk mendapatkan nama
import { Download } from 'lucide-react';

interface StatsData {
  totalAdditions: number;
  totalDeletions: number;
  calendarWeeks: any[];
  averageChangesPerDay: number;
}

export default function Dashboard() {
  const [data, setData] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session } = useSession(); // Dapatkan data sesi
  const imageRef = useRef<HTMLDivElement>(null); // Ref untuk menunjuk ke komponen gambar

  useEffect(() => {
    async function fetchData() {
      // ... (logika fetch data Anda tetap sama)
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

  // Fungsi untuk menangani unduhan gambar
  const handleDownload = () => {
    if (imageRef.current) {
      html2canvas(imageRef.current, {
        backgroundColor: null, // Latar belakang transparan
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `git-strava-${session?.user?.login}-${new Date().toISOString().split('T')[0]}.png`;
        link.click();
      });
    }
  };

  if (isLoading) return <p className="text-white animate-pulse">Memuat statistik Anda...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data || !session?.user?.name) return <p className="text-white">Tidak ada data untuk ditampilkan.</p>;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-2 mt-6">
        {/* Tata letak dashboard Anda yang sekarang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-fit">
          <div className="flex flex-col gap-6 w-full md:w-fit">
            <StatCard title="LOC Additions" value={`+${data.totalAdditions.toLocaleString()}`} valueColor="text-green-400"/>
            <StatCard title="LOC Deletions" value={`-${data.totalDeletions.toLocaleString()}`} valueColor="text-red-400"/>
            <StatCard title="Lines Changed / Day" value={Math.round(data.averageChangesPerDay).toLocaleString()}/>
          </div>
          <div className="flex h-full">
            <ContributionCalendar weeks={data.calendarWeeks} />
          </div>
        </div>
      </div>

      {/* Tombol Download ditambahkan di sini */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          <Download size={18} />
          Download Overlay
        </button>
      </div>
      
      {/* Komponen untuk di-download, dirender tapi disembunyikan */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
      {/* <div> */}
        <ShareableImage ref={imageRef} data={data} username={session.user.name} />
      </div>
    </>
  );
}