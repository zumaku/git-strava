// File: app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
  // Konfigurasi satu atau lebih provider otentikasi
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...tambahkan provider lain di sini jika perlu
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }