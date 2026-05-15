import React from 'react';
import { Sparkles, Truck, Flame } from 'lucide-react';

export const Banner = () => {
  const bannerText = (
    <div className="flex items-center gap-8 px-4">
      <span className="flex items-center gap-2">
        <Flame size={14} className="text-orange-400 fill-orange-400 shrink-0" />
        ¡Precios increíbles con ofertas exclusivas de hasta 50% OFF!
      </span>
      <span className="text-blue-300">•</span>
      <span className="flex items-center gap-2">
        <Truck size={14} className="text-blue-400 shrink-0" />
        Envío rápido y garantizado a todo Laferrere y alrededores
      </span>
      <span className="text-blue-300">•</span>
      <span className="flex items-center gap-2">
        <Sparkles size={14} className="text-yellow-400 fill-yellow-400 shrink-0" />
        ¡Aprovechá estas oportunidades únicas por tiempo limitado!
      </span>
      <span className="text-blue-300">•</span>
    </div>
  );

  return (
    <div className="bg-gray-950 border-b border-gray-800 overflow-hidden py-2.5 shadow-sm relative z-50">
      <div className="relative flex whitespace-nowrap overflow-hidden my-auto select-none">
        <div className="animate-marquee flex items-center text-[11px] sm:text-xs font-black tracking-wider text-gray-200 uppercase">
          {bannerText}
          {bannerText}
          {bannerText}
          {bannerText}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />
    </div>
  );
};
