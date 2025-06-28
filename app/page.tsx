'use client'

import AuthButton from './components/AuthButton';
import Dashboard from './components/Dashboard';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import HomePage from './components/Homepage';

export default function Home() {
  const { status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-8 bg-gray-900">
      <nav className="w-full flex justify-between items-center">
        <a href="https://gitstrava.vercel.app">
          <Image src={'/git-strava primary logo.png'} width={170} height={50} alt='Git-Starava Primary Logo' />
        </a>
        <AuthButton />
      </nav>

      {status === 'authenticated' ? (
        <Dashboard />
      ): (
        <HomePage />
      )}
    </main>
  );
}