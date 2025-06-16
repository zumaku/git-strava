// File: app/components/AuthButton.tsx

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { LogIn, LogOut } from 'lucide-react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  // Tampilkan status loading saat sesi sedang diperiksa
  if (status === 'loading') {
    return <div className="p-2 rounded-md bg-gray-700 animate-pulse w-36 h-10"></div>;
  }

  // Jika pengguna sudah login (terotentikasi)
  if (status === 'authenticated') {
    return (
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? 'User Avatar'}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <span className="text-white hidden sm:block">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          <LogOut size={18} />
          <p className='hidden sm:block'>Logout</p>
        </button>
      </div>
    );
  }

  // Jika pengguna belum login
  return (
    <button
      onClick={() => signIn('github')}
      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
    >
      <LogIn size={18} />
      <p className='hidden sm:block'>Login with GitHub</p>
    </button>
  );
}