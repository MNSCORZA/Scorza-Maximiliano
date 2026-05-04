import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-transparent">
      <div className="relative flex items-center justify-center">
        <div className="absolute animate-ping h-16 w-16 rounded-full bg-indigo-400 opacity-20"></div>
        
        <div className="relative flex gap-1">
          <div className="w-4 h-12 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
          <div className="w-4 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
          <div className="w-4 h-12 bg-indigo-400 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <p className="text-indigo-900 font-black text-xl tracking-tighter uppercase animate-pulse">
          Cargando De Todo
        </p>
        <div className="w-48 h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full animate-[shimmer_2s_infinite] w-full origin-left"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};