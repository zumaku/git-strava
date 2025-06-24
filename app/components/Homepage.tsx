import { Star, Gift, LogIn, Bot, Download } from 'lucide-react'; // <-- Menambahkan ikon baru

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
                        By Me Coffee
                    </a>
                </div>
            </div>

            {/* --- SEKSI BARU: CARA KERJA --- */}
            <div className="w-full max-w-6xl mx-auto py-16 px-4">
                <h3 className="text-3xl font-bold text-white text-center mb-12">3 Easy Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    
                    {/* Kolom Kiri: Langkah-langkah */}
                    <div className="flex flex-col gap-8 text-left">
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-600/20 text-indigo-400 p-3 rounded-lg">
                                <LogIn size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">1. Login with GitHub</h4>
                                <p className="text-gray-400 mt-1">Securely authenticate your account. We only ask for permission to read your public and private activity.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-600/20 text-indigo-400 p-3 rounded-lg">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">2. Automated Process</h4>
                                <p className="text-gray-400 mt-1">The application will automatically retrieve and process your contribution data for the last month.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-600/20 text-indigo-400 p-3 rounded-lg">
                                <Download size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-white">3. Download & Paste In Your Video</h4>
                                <p className="text-gray-400 mt-1">Create an overlay, preview it, and download the result as a PNG image ready to use in your vidio.</p>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Placeholder Video */}
                    {/* Kolom Kanan: Video Demo yang Diperbarui */}
                    <div className="w-full max-w-2xs mx-auto aspect-[9/16] bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        <video 
                            className="w-full h-full object-cover"
                            src="/gitstrava_by_zuma.mp4"
                            loop 
                            playsInline
                            controls 
                            controlsList="nodownload nofullscreen noremoteplayback"
                            disablePictureInPicture
                        >
                            Browser Anda tidak mendukung tag video.
                        </video>

                    </div>

                </div>
            </div>
            {/* --- AKHIR SEKSI BARU --- */}

            <p className="text-lg text-gray-400 mt-10">
                Created by <a href="https://github.com/zumaku" className="font-bold text-white hover:underline">Zumaku</a>
            </p>
        </div>
    )
}