import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Zap } from 'lucide-react';
import { getBannerSettings } from '../fireBase/dataBase';

const PromoBanner = () => {
  const [hero, setHero] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getBannerSettings('hero');
        setHero(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHero();
  }, []);

  const handleContainerClick = () => {
    if (hero?.link) {
      navigate(hero.link);
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className={`bg-gray-100 border-b border-gray-200 py-2 text-center relative z-40 ${hero?.link ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
        <Zap size={13} className="text-blue-600 fill-blue-600 shrink-0 animate-pulse" />
        {hero?.title ? (
          <span>
            {hero.title} {hero.subtitle && <span className="text-blue-600 font-black">{hero.subtitle}</span>}
          </span>
        ) : (
          <span>
            Llega mañana <span className="text-blue-600 font-black">gratis</span> en compras seleccionadas
          </span>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
