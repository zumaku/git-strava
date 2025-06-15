// File: app/components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/github-stats/');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
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

  if (isLoading) return <p className="text-white">Loading your stats...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-8 w-full max-w-4xl bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Raw Stats Data</h2>
      <pre className="text-xs overflow-auto">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}