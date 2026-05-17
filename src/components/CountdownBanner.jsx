import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { getBannerSettings } from '../fireBase/dataBase';

export const CountdownBanner = () => {
  const [settings, setSettings] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getBannerSettings('countdown_offer');
        if (data) setSettings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings || !settings.active || !settings.endDate) return;

    const calculateTime = () => {
      const difference = +new Date(settings.endDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [settings]);

  if (!settings || !settings.active) return null;

  const bgStyles = {
    azul: {
      top: "from-gray-900 via-indigo-950 to-blue-950",
      bottom: "bg-blue-600/20",
      button: "text-gray-900 bg-white hover:bg-orange-500 hover:text-white",
      subTag: "text-blue-400"
    },
    rojo: {
      top: "from-neutral-950 via-red-950 to-neutral-900",
      bottom: "bg-red-600/20",
      button: "text-white bg-red-600 hover:bg-red-700",
      subTag: "text-red-400"
    },
    premium: {
      top: "from-neutral-950 via-neutral-900 to-neutral-800",
      bottom: "bg-amber-500/10 border-t lg:border-t-0 lg:border-l border-amber-500/20",
      button: "text-neutral-900 bg-amber-500 hover:bg-amber-600 font-black",
      subTag: "text-amber-400"
    }
  };

  const currentStyle = bgStyles[settings.colorPalette] || bgStyles.azul;

  return (
    <div className="w-full bg-white py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`grid grid-cols-1 lg:grid-cols-3 rounded-2xl overflow-hidden bg-gradient-to-br ${currentStyle.top} text-white shadow-xl`}>
          <div className="p-8 md:p-12 lg:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <span className="bg-orange-500 text-white font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                {settings.tagText}
              </span>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight mt-4 leading-tight">
                {settings.title}
              </h3>
              <p className="text-sm text-gray-300 mt-2 max-w-xl">
                {settings.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Termina en:</span>
              <div className="flex gap-2">
                {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((value, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-orange-400 tabular-nums">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${currentStyle.bottom} border-t lg:border-t-0 lg:border-l border-white/10 p-8 flex flex-col justify-center items-start lg:items-center text-left lg:text-center relative overflow-hidden`}>
            <div className="relative z-10 space-y-4 w-full lg:max-w-xs">
              <div className={`text-xs font-bold ${currentStyle.subTag} uppercase tracking-widest`}>
                {settings.bottomTitle}
              </div>
              <div className="text-xl font-extrabold tracking-tight">
                {settings.bottomSubtitle}
              </div>
              <Link to={settings.link || "/Catalogo"} className="block w-full">
                <button className={`w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md ${currentStyle.button}`}>
                  <span>{settings.buttonText || "Aprovechar Oferta"}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
