export default function StatCardSkeleton() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col gap-3">
      {/* Placeholder untuk judul */}
      <div className="h-4 bg-gray-700 rounded-md w-1/2 animate-pulse"></div>
      {/* Placeholder untuk nilai */}
      <div className="h-9 bg-gray-700 rounded-md w-3/4 animate-pulse"></div>
    </div>
  );
}