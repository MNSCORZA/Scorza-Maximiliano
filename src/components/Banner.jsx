import React, { useEffect, useState } from 'react';
import { Sparkles, Truck, Flame } from 'lucide-react';
import { getBannerSettings } from '../fireBase/dataBase';

export const Banner = () => {
  const [dbText, setDbText] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        setLoading(true);
        const data = await getBannerSettings('promo');
        if (data && data.active && data.text) {
          setDbText(data.text);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromo();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-950 border-b border-gray-800 py-2.5 h-[38px] flex items-center justify-center relative z-50 overflow-hidden">
        <div className="h-2 bg-gray-800 rounded-full w-2/3 max-w-md animate-pulse" />
      </div>
    );
  }

  if (!dbText) return null;

  const bannerText = (
    <div className="flex items-center gap-8 px-4">
      <span className="flex items-center gap-2">
        <Flame size={14} className="text-orange-400 fill-orange-400 shrink-0" />
        {dbText}
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
          {bannerText}
          {bannerText}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-16.66%); }
        }
        .animate-marquee {
          animation: marquee 14s linear infinite;
        }
      `}} />
    </div>
  );
};
