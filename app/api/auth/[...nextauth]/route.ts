// File: app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- Impor konfigurasi dari file baru

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };