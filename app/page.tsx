// File: app/page.tsx
'use client'


import AuthButton from './components/AuthButton';
import Dashboard from './components/Dashboard';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900">
      <nav className="w-full flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold text-white">Git-Strava</h1> */}
        <Image src={'/git-strava primary logo.png'} width={200} height={50} alt='Git-Starava Primary Logo' />
        <AuthButton />
      </nav>

      {status === 'authenticated' ? (
        <Dashboard />
      ): (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Strava Overlay Trends, but for Developers.
          </h2>
          <p className="text-lg text-gray-400">
            Get your monthly Github recap, so you can overlay it in your story.
          </p>
          <p className="text-lg text-gray-400">
            Login with GitHub to see your activity summary.
          </p>
        </div>
      )}
    </main>
  );
}