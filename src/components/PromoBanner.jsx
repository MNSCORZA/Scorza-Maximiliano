import React from 'react';
import { Zap } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-200 py-2 text-center relative z-40">
      <div className="container mx-auto px-4 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
        <Zap size={13} className="text-blue-600 fill-blue-600 shrink-0 animate-pulse" />
        <span>
          Llega mañana <span className="text-blue-600 font-black">gratis</span> en compras seleccionadas
        </span>
      </div>
    </div>
  );
};

export default PromoBanner;
