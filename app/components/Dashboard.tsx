'use client';

import { useState, useEffect, useRef } from 'react';
import StatCard from './StatCard';
import ContributionCalendar from './ContributionCalendar';
import StatCardSkeleton from './StatCardSkeleton';
import ContributionCalendarSkeleton from './ContributionCalendarSkeleton';
import html2canvas from 'html2canvas';
import ShareableImage from './ShareableImage';
import { useSession } from 'next-auth/react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';
import SuccessToast from './SuccessToast';

// Mendefinisikan tipe data untuk 'calendarWeeks' secara spesifik
interface ContributionDay {
  contributionCount: number;
  date: string;
}
interface ContributionWeek {
  contributionDays: ContributionDay[];
}
interface StatsData {
  totalAdditions: number;
  totalDeletions: number;
  calendarWeeks: ContributionWeek[];
  averageChangesPerDay: number;
}

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [data, setData] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session } = useSession(); // Dapatkan data sesi
  const imageRef = useRef<HTMLDivElement>(null); // Ref untuk menunjuk ke komponen gambar

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Mulai loading setiap kali bulan berubah
      setError(null);

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      try {
        const response = await fetch(`/api/github-stats?year=${year}&month=${month}`);
        if (!response.ok) throw new Error('Gagal mengambil data statistik');
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Penanganan error yang lebih aman
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentDate]);

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
        toast.custom((t) => (
          <SuccessToast t={t} />
        ));
      });
    }
  };

  const changeMonth = (amount: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const monthYearLabel = currentDate.toLocaleString('en-EN', {
    month: 'long',
    year: 'numeric'
  });

  const DashboardSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-fit mt-6">
      <div className="flex flex-col gap-6 w-full">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="flex h-full">
        <ContributionCalendarSkeleton />
      </div>
    </div>
  );

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data || !session?.user?.name) return <p className="text-white">Invalid session.</p>;

  return (
    <div className="max-w-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-fit mt-6">
        <div className="flex flex-col gap-6 w-full">
          <StatCard title="LOC Additions" value={`+${data.totalAdditions.toLocaleString()}`} valueColor="text-green-400"/>
          <StatCard title="LOC Deletions" value={`-${data.totalDeletions.toLocaleString()}`} valueColor="text-red-400"/>
          <StatCard title="Lines Changed / Day" value={Math.round(data.averageChangesPerDay).toLocaleString()}/>
        </div>
        <div className="flex h-full">
          <ContributionCalendar weeks={data.calendarWeeks} />
        </div>
      </div>

      <div className="flex flex-col w-full gap-3">
        <div className="flex items-center mt-4 w-full justify-between bg-gray-800 p-2 rounded-lg">
          <button onClick={() => changeMonth(-1)} className="flex-grow p-2 rounded-md hover:bg-gray-700">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <h2 className="text-xl font-bold text-white text-center px-4">{monthYearLabel}</h2>
          <button onClick={() => changeMonth(1)} className="flex justify-end flex-grow p-2 rounded-md hover:bg-gray-700">
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>

        {/* Tombol Download ditambahkan di sini */}
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-[#FF574A] hover:bg-[#FF6054] text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          <Download size={18} />
          Download Overlay
        </button>
      </div>
      
      {/* Komponen untuk di-download, dirender tapi disembunyikan */}
      {data && session?.user?.name && (
        <div style={{ position: 'absolute', left: '-9999px', top: 0, paddingTop: '40px' }}>
          <ShareableImage ref={imageRef} data={data} monthYearLabel={monthYearLabel} username={session.user.name} />
        </div>
      )}
    </div>
  );
}