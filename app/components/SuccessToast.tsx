'use client';

import { toast } from 'react-hot-toast';
import { Star, Gift, X } from 'lucide-react';

interface SuccessToastProps {
  t: {
    id: string;
    visible: boolean;
  };
}

export default function SuccessToast({ t }: SuccessToastProps) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-gray-700 relative`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-base font-medium text-white">Enjoy the Trend!</p>
            <p className="mt-1 text-sm text-gray-400">
              Don&apos;t forget to tag <a href="https://www.instagram.com/fadliinlov3/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">@fadliinlov3</a> on your Instagram story!
            </p>
            <div className="mt-4 flex gap-4">
                <a 
                    href="https://github.com/zumaku/git-strava"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold py-1.5 px-3 rounded-lg transition-colors"
                >
                    <Star size={16} />
                    Give a Star
                </a>
                <a 
                    href="https://saweria.co/zumakuu"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FF574A] hover:bg-[#FF6054] text-white text-sm font-semibold py-1.5 px-3 rounded-lg transition-colors"
                >
                    <Gift size={16} />
                    Support
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Close dipindahkan ke pojok kanan atas dengan styling baru */}
      <div className="absolute top-2 right-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none"
        >
          <span className="sr-only">Close</span>
          <X size={20} />
        </button>
      </div>
    </div>
  );
}