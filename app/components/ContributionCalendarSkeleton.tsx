// File: app/components/ContributionCalendarSkeleton.tsx

export default function ContributionCalendarSkeleton() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full h-full">
      {/* Placeholder untuk judul bulan */}
      <div className="h-7 bg-gray-700 rounded-md w-1/2 mb-4 animate-pulse"></div>
      
      {/* Placeholder untuk grid kalender */}
      <div className="grid grid-flow-col grid-rows-7 gap-2">
        {/* Membuat 35 kotak (7 hari x 5 minggu) sebagai placeholder */}
        {Array.from({ length: 35 }).map((_, index) => (
          <div
            key={index}
            className="w-8 h-8 bg-gray-700 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}