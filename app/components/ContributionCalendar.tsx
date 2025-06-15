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

// Fungsi helper untuk menentukan warna berdasarkan jumlah kontribusi
const getContributionColor = (count: number): string => {
  if (count === 0) return 'bg-gray-800';
  if (count <= 2) return 'bg-green-900';
  if (count <= 5) return 'bg-green-700';
  if (count <= 10) return 'bg-green-500';
  return 'bg-green-400';
};

export default function ContributionCalendar({ weeks }: ContributionCalendarProps) {
  // Kita perlu mengisi hari kosong di awal untuk alignment
  const firstWeekLength = weeks[0]?.contributionDays.length || 0;
  const emptyDays = Array(7 - firstWeekLength).fill(null);

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
       <h3 className="text-lg font-bold text-white mb-4">Kalender Kontribusi Bulan Ini</h3>
       <div className="grid grid-cols-7 grid-flow-col gap-1.5 justify-end">
         {emptyDays.map((_, index) => (
           <div key={`empty-${index}`} className="w-5 h-5 rounded-sm" />
         ))}
         {weeks.map((week, weekIndex) =>
           week.contributionDays.map((day, dayIndex) => (
             <div
               key={day.date}
               className={`w-5 h-5 rounded-sm ${getContributionColor(day.contributionCount)}`}
               title={`${day.contributionCount} kontribusi pada ${day.date}`} // Tooltip sederhana
             />
           ))
         )}
       </div>
    </div>
  );
}