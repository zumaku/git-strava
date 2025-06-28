// File: app/components/HowItWorksSection.tsx
'use client';

import { useState } from 'react';
import { LogIn, Bot, Download } from 'lucide-react';
import PrivacyModal from './PrivacyModal';

export default function HowItWorksSection() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-white text-center mb-12">3 Easy Steps</h3>
            
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            
            {/* Kolom Kiri: Langkah-langkah, sekarang mengambil 2 kolom di desktop */}
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
                            className="text-indigo-400 hover:underline ml-1 font-semibold"
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

            {/* Kolom Kanan: Video, mengambil 1 kolom di desktop */}
            <div className="w-full max-w-xs mx-auto aspect-[9/16] bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <video 
                    className="w-full h-full object-cover"
                    src="/gitstrava_by_zuma.mp4"
                    loop 
                    playsInline
                    autoPlay
                    controls 
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                >
                    Your browser does not support the video tag.
                </video>
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