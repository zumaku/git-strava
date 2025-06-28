'use client';

import { useState, useRef } from 'react';
import { LogIn, Bot, Download, Play } from 'lucide-react';
import PrivacyModal from './PrivacyModal';

export default function HowItWorksSection() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // video tidak auto play

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-white text-center mb-12">3 Langkah Mudah</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            
          <div className="flex flex-col gap-8 text-left lg:col-span-2">
            <div className="flex items-start gap-4">
                    <div className="bg-indigo-600/20 text-indigo-400 p-3 rounded-lg">
                        <LogIn size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-white">1. Login with GitHub</h4>
                        <p className="text-gray-400 mt-1">
                            Secure authentication. We request repository access permission to calculate accurate statistics.
                            <button 
                            onClick={() => setIsPrivacyModalOpen(true)} 
                            className="text-indigo-400 hover:underline ml-1 font-semibold hover:cursor-pointer"
                            >
                            Learn more.
                            </button>
                        </p>
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

          <div 
            className="w-full max-w-xs mx-auto aspect-[9/16] bg-gray-900 border border-gray-700 rounded-lg overflow-hidden relative cursor-pointer"
            onClick={togglePlayPause} // Klik di area ini akan memicu play/pause
          >
            <video 
                ref={videoRef} // Menghubungkan ref ke elemen video
                className="w-full h-full object-cover"
                src="/gitstrava.mp4"
                loop 
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                Browser Anda tidak mendukung tag video.
            </video>

            {/* Ikon Play hanya muncul saat video dijeda */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#00000066] transition-opacity duration-300">
                <div className="rounded-full p-4">
                  <Play size={48} className="text-white fill-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </>
  );
}