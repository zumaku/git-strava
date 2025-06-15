// File: app/components/ContributionCalendar.tsx
'use client';

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

interface ContributionCalendarProps {
  weeks: ContributionWeek[];
}

// Fungsi helper untuk menentukan warna, tidak ada perubahan di sini
const getContributionColor = (count: number): string => {
  // Warna ini diambil langsung dari skema warna GitHub
  if (count === 0) return 'bg-[#303742]'; // Kotak kosong (abu-abu gelap)
  if (count <= 2) return 'bg-[#004018]';  // Level 1
  if (count <= 6) return 'bg-[#007732]';  // Level 2
  if (count <= 12) return 'bg-[#00AF48]'; // Level 3
  return 'bg-[#00E66A]';                 // Level 4 (Paling terang)
};


export default function ContributionCalendar({ weeks }: ContributionCalendarProps) {
  if (!weeks || weeks.length === 0) {
    return <div>Data kontribusi tidak tersedia.</div>;
  }

  const firstDate = weeks[1]?.contributionDays[0]?.date;
  if (!firstDate) {
    return <div>Format data kontribusi tidak valid.</div>;
  }

  const monthName = new Date(firstDate).toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-fit h-full">
      <h3 className="text-lg font-bold text-white mb-4">{monthName}</h3>
      
      <div className="w-full overflow-x-auto pb-2">
        {/*
          PERUBAHAN UTAMA:
          - Label hari dihapus.
          - Ukuran kotak diubah dari w-5 h-5 menjadi w-8 h-8 (lebih besar).
          - Jarak antar kotak diubah dari gap-1.5 menjadi gap-2.
        */}
        <div className="grid grid-flow-col grid-rows-7 gap-2" style={{ width: 'max-content' }}>
          {weeks.map((week) =>
            week.contributionDays.map((day) => (
              <div
                key={day.date}
                className={`w-8 h-8 rounded-md transition-colors ${getContributionColor(day.contributionCount)}`}
                title={`${day.contributionCount} kontribusi pada ${new Date(day.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}