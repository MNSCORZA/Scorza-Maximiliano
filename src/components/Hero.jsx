import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getBannerSettings } from '../fireBase/dataBase';

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const data = await getBannerSettings('hero');
        if (data) {
          setHero(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  // SKELETON VISUAL PREMIUM PARA EL HERO
  if (loading) {
    return (
      <div className="w-full h-[350px] md:h-[480px] bg-neutral-950 flex items-center relative overflow-hidden">
        {/* Efecto de pulso de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        
        {/* Simulación del contenido */}
        <div className="container mx-auto px-6 relative z-20 space-y-4 animate-pulse">
          {/* Línea 1 del título */}
          <div className="h-8 md:h-12 bg-neutral-800 rounded-lg w-3/4 max-w-sm" />
          {/* Línea 2 del título (Subtítulo destacado) */}
          <div className="h-8 md:h-12 bg-blue-900/40 rounded-lg w-1/2 max-w-xs" />
          {/* Simulación del botón */}
          <div className="h-12 bg-neutral-800 rounded-md w-52 pt-2" />
        </div>
      </div>
    );
  }

  if (!hero) return null;

  return (
    <section className="relative bg-black h-[350px] md:h-[480px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />

      {hero.imageUrl && (
        <img 
          src={hero.imageUrl} 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}

      <div className="container mx-auto px-6 relative z-20 text-white">
        <h1 className="text-3xl md:text-5xl font-bold max-w-xl leading-[1.1] mb-6">
          {hero.title} <br />
          {hero.subtitle && (
            <span className="text-blue-500 font-extrabold uppercase">
              {hero.subtitle}
            </span>
          )}
        </h1>
        
        <Link to={hero.link || "/Catalogo"}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-md font-semibold text-sm transition-all shadow-lg active:scale-[0.97] cursor-pointer">
            {(hero.buttonText || "VER CATÁLOGO COMPLETO").toUpperCase()}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
