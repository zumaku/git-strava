// File: app/api/github-stats/route.ts
// KODE INI HANYA UNTUK TUJUAN DEBUGGING

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  console.log("\n--- MEMULAI DEBUG getServerSession ---");

  // Kita hanya akan memanggil getServerSession dan tidak melakukan hal lain.
  const session = await getServerSession(authOptions);

  // Kita cetak hasilnya ke terminal server untuk dilihat.
  console.log("Hasil langsung dari getServerSession di dalam API Route:", session);
  console.log("--- SELESAI DEBUG ---");

  // Kita kembalikan seluruh objek sesi ini sebagai respons JSON.
  // Hasilnya akan tampil di bagian "Raw Stats Data" di browser Anda.
  return NextResponse.json(session);
}