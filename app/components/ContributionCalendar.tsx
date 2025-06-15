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

const getContributionColor = (count: number): string => {
  if (count === 0) return 'bg-gray-700/50';
  if (count <= 2) return 'bg-green-900';
  if (count <= 5) return 'bg-green-700';
  if (count <= 10) return 'bg-green-500';
  return 'bg-green-400';
};

export default function ContributionCalendar({ weeks }: ContributionCalendarProps) {
  // Logic untuk mengisi hari kosong di awal agar kalender rata kiri
  // Misalnya, jika bulan dimulai hari Rabu, kita perlu 2 hari kosong (Senin, Selasa)
  let firstDayOfWeek = 7; // Default jika tidak ada data
  if (weeks[0]?.contributionDays[0]?.date) {
    // Hari di JS: 0=Minggu, 1=Senin, ..., 6=Sabtu. Kita ubah agar 0=Senin
    const dayIndex = new Date(weeks[0].contributionDays[0].date).getDay();
    firstDayOfWeek = dayIndex === 0 ? 6 : dayIndex -1;
  }
  const emptyDays = Array(firstDayOfWeek).fill(null);

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex-grow">
      <h3 className="text-md font-bold text-white mb-4">Kalender Kontribusi</h3>
      
      {/* INI BAGIAN UTAMA YANG DIPERBAIKI */}
      <div className="grid grid-cols-7 grid-flow-row gap-1.5">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="w-full aspect-square" />
        ))}
        {weeks.map((week) =>
          week.contributionDays.map((day) => (
            <div
              key={day.date}
              className={`w-full aspect-square rounded-sm ${getContributionColor(day.contributionCount)}`}
              title={`${day.contributionCount} kontribusi pada ${day.date}`}
            />
          ))
        )}
      </div>
    </div>
  );
}