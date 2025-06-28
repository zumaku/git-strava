import { Star, Gift } from 'lucide-react';
import HowItWorksSection from './HowItWorksSection';

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

            <HowItWorksSection />

            <p className="text-lg text-gray-400 mt-10">
                Created by <a href="https://github.com/zumaku" className="font-bold text-white hover:underline">Zumaku</a>
            </p>
        </div>
    )
}