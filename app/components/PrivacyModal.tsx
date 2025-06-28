// File: app/components/PrivacyModal.tsx
'use client';

import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg relative max-w-2xl w-full shadow-xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-4">Privacy & Data Security Policy</h2>
        <div className="text-gray-300 space-y-4 text-left">
          <p>
            Git-Strava requests access permission to repositories (`repo` scope) for one purpose: to accurately calculate Lines of Code (LOC) statistics of your contributions, including those in private repositories.
          </p>
          <p className="font-semibold text-white">
            We <strong className="text-red-400">NEVER</strong> read, copy, or store the contents of your code.
          </p>
          <p>
            All data processing is done *on-the-fly* only to fetch commit metadata (line count) and your token is only used for the duration of your session. Your code remains completely yours.
          </p>
        </div>
      </div>
    </div>
  );
}