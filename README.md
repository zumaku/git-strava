<p align="center">
  <img src="./public/git-strava primary logo.png" alt="Git-Strava Logo" width="400"/>
</p>

<h1 align="center">Git-Strava</h1>

<p align="center">
  Strava Overlay Trends, but for Developers. Dapatkan ringkasan aktivitas GitHub bulanan Anda dalam format gambar yang siap dibagikan.
  <br />
  <br />
  <a href="https://github.com/zumaku/git-strava/issues">Laporkan Bug</a>
  ·
  <a href="https://github.com/zumaku/git-strava/issues">Minta Fitur Baru</a>
</p>

<p align="center">
  <a href="https://saweria.co/your-username">
    <img src="https://img.shields.io/badge/Traktir%20di-Saweria-brightgreen?style=for-the-badge&logo=saweria" alt="Traktir di Saweria">
  </a>
</p>

## Tentang Proyek

![Git-Strava Screenshot](screenshot-dashboard.png)

**Git-Strava** adalah sebuah aplikasi web yang memungkinkan developer untuk masuk dengan akun GitHub mereka dan secara otomatis menghasilkan ringkasan aktivitas bulanan. Terinspirasi dari ringkasan aktivitas yang sering dibagikan oleh para pelari di Strava, proyek ini bertujuan untuk memberikan "overlay" serupa bagi para developer untuk menunjukkan produktivitas dan kontribusi mereka di GitHub.

Hasil akhir dari ringkasan ini dapat diunduh sebagai gambar PNG dengan rasio 9:16, sempurna untuk dibagikan di media sosial seperti Instagram Stories.

### Fitur Utama

* Login aman menggunakan akun GitHub (OAuth 2.0).
* Menampilkan total statistik bulanan:
    * LOC (Lines of Code) Additions
    * LOC (Lines of Code) Deletions
    * Rata-rata perubahan baris kode per hari
* Visualisasi kalender kontribusi bulanan yang otentik.
* Fitur unduh ringkasan sebagai gambar PNG dengan rasio 9:16.

### Dibangun Menggunakan

Daftar teknologi utama yang digunakan dalam proyek ini:

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [NextAuth.js](https://next-auth.js.org/)
* [html2canvas](https://html2canvas.hertzen.com/)
* [Recharts](https://recharts.org/) (pada versi awal)
* [Lucide React](https://lucide.dev/) (untuk ikon)

## Memulai

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah sederhana berikut.

### Prasyarat

Pastikan Anda sudah menginstal Node.js dan npm (atau yarn/pnpm) di mesin Anda.

### Instalasi Lokal

1.  **Clone repositori ini:**
    ```sh
    git clone [https://github.com/zumaku/git-strava.git](https://github.com/zumaku/git-strava.git)
    ```
2.  **Masuk ke direktori proyek:**
    ```sh
    cd git-strava
    ```
3.  **Install semua dependensi:**
    ```sh
    npm install
    ```
4.  **Konfigurasi Environment Variables:**
    * Buat file `.env.local` di root proyek.
    * Daftarkan aplikasi OAuth baru di [Developer settings](https://github.com/settings/developers) GitHub Anda.
    * Set **Authorization callback URL** ke `http://localhost:3000/api/auth/callback/github`.
    * Isi file `.env.local` dengan kredensial Anda:
        ```env
        GITHUB_ID=CLIENT_ID_ANDA
        GITHUB_SECRET=CLIENT_SECRET_ANDA
        AUTH_SECRET=STRING_ACAK_YANG_SANGAT_RAHASIA
        ```
5.  **Jalankan server development:**
    ```sh
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Berkontribusi

Kontribusi dari Anda adalah hal yang membuat komunitas open source menjadi tempat yang luar biasa untuk belajar, menginspirasi, dan berkreasi. Setiap kontribusi yang Anda berikan sangat **kami hargai**.

Jika Anda memiliki saran untuk membuat proyek ini lebih baik, silakan fork repositori ini dan buat *pull request*. Anda juga bisa membuka *issue* dengan tag "enhancement".

Jangan lupa untuk memberi bintang pada proyek ini! Terima kasih!

Langkah-langkah untuk berkontribusi:
1.  **Fork** Proyek ini.
2.  Buat Branch Fitur Anda (`git checkout -b feature/FiturBaruYangKeren`).
3.  Commit Perubahan Anda (`git commit -m 'Menambahkan FiturBaruYangKeren'`).
4.  Push ke Branch (`git push origin feature/FiturBaruYangKeren`).
5.  Buka sebuah **Pull Request**.