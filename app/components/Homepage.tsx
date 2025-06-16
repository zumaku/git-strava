import { Star, Gift, LogIn, Bot, Download, PlayCircle } from 'lucide-react'; // <-- Menambahkan ikon baru

export default function HomePage() {
    return (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            {/* Bagian Hero Section (tetap sama) */}
            <div className='py-16'>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Strava Overlay Trends, but for Developers.</h2>
                <p className="text-lg text-gray-400">Get your monthly Github recap, so you can overlay it in your story.</p>
                <p className="text-lg text-gray-400">Login with GitHub to see your activity summary.</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <a 
                        href="https://github.com/zumaku/git-strava"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        <Star size={18} />
                        Star on GitHub
                    </a>
                    
                    <a 
                        href="https://saweria.co/zumakuu"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#FF574A] hover:bg-[#FF6054] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        <Gift size={18} />
                        Traktir di Saweria
                    </a>
                </div>
            </div>

            {/* --- SEKSI BARU: CARA KERJA --- */}
            <div className="w-full max-w-6xl mx-auto py-16 px-4">
                <h3 className="text-3xl font-bold text-white text-center mb-12">3 Langkah Mudah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    
                    {/* Kolom Kiri: Langkah-langkah */}
                    <div className="flex flex-col gap-8 text-left">
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-600/20 text-indigo-400 p-3 rounded-lg">
                                <LogIn size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">1. Login dengan GitHub</h4>
                                <p className="text-gray-400 mt-1">Otentikasi akun Anda dengan aman. Kami hanya meminta izin untuk membaca aktivitas publik dan privat Anda.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-600/20 text-indigo-400 p-3 rounded-lg">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">2. Proses Otomatis</h4>
                                <p className="text-gray-400 mt-1">Aplikasi akan mengambil dan memproses data kontribusi Anda selama sebulan terakhir secara otomatis.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-600/20 text-indigo-400 p-3 rounded-lg">
                                <Download size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">3. Unduh & Bagikan</h4>
                                <p className="text-gray-400 mt-1">Buat overlay, lihat pratinjaunya, dan unduh hasilnya sebagai gambar PNG yang siap dibagikan ke media sosial.</p>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Placeholder Video */}
                    <div className="aspect-video bg-gray-900 border border-gray-700 rounded-lg flex flex-col justify-center items-center text-gray-500">
                        <PlayCircle size={64} />
                        <p className="mt-4 font-semibold">Video Demo Segera Hadir</p>
                    </div>

                </div>
            </div>
            {/* --- AKHIR SEKSI BARU --- */}

            <p className="text-lg text-gray-400 mt-10">
                Created by
                <a href="https://github.com/zumaku" className="font-bold text-white hover:underline"> Zumaku</a>
            </p>
        </div>
    )
}