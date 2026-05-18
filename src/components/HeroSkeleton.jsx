import React from 'react';

export const HeroSkeleton = () => {
  return (
    <div className="w-full h-[350px] md:h-[480px] bg-neutral-950 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />

      <div className="container mx-auto px-6 relative z-20 space-y-4 animate-pulse">
        <div className="h-8 md:h-12 bg-neutral-800 rounded-lg w-3/4 max-w-sm" />
        <div className="h-8 md:h-12 bg-blue-900/40 rounded-lg w-1/2 max-w-xs" />
        <div className="h-12 bg-neutral-800 rounded-md w-52 pt-2" />
      </div>
    </div>
  );
};
