// File: app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Git-Strava',
  description: 'Strava Overlay Trends, but for Developers. Get your monthly GitHub activity recap now. Generate and download your monthly GitHub activity summary. See your stats like LOC additions, deletions, and contribution calendar, inspired by Strava.',
  keywords: ['github', 'recap', 'stats', 'wrapper', 'developer', 'git', 'strava', 'overlay', 'zumaku'],
  authors: [{ name: 'Zumaku', url: 'https://github.com/zumaku' }],
  creator: 'Zumaku',
  icons: {
    icon: 'git-strava_favicon.svg'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="b9vZXO3othX2eP3PFFKm_Zf_gK4lb1FXzo8VuZ427T8" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}