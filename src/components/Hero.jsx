import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getBannerSettings } from '../fireBase/dataBase';

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true); // <-- Estado para controlar la carga inicial

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
        setLoading(false); // <-- Apagamos el cargador cuando Firebase responda
      }
    };
    fetchHero();
  }, []);

  // Mientras carga la base de datos, mostramos un esqueleto del mismo tamaño para evitar el parpadeo
  if (loading) {
    return (
      <div className="w-full h-[350px] md:h-[480px] bg-gray-950 flex items-center justify-center relative overflow-hidden">
        {/* Efecto de luz de carga sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
        <span className="relative z-10 text-gray-500 font-bold text-xs uppercase tracking-widest animate-pulse">
          Cargando banner principal...
        </span>
      </div>
    );
  }

  // Si terminó de cargar pero por alguna razón no hay datos o el banner está inactivo, no renderizamos nada
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-md font-semibold text-sm transition-all shadow-lg active:scale-95 cursor-pointer">
            {(hero.buttonText || "VER CATÁLOGO COMPLETO").toUpperCase()}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
