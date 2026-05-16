import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getBannerSettings } from '../fireBase/dataBase';

const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getBannerSettings('hero');
        if (data) {
          setHero(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHero();
  }, []);

  return (
    <section className="relative bg-black h-[350px] md:h-[480px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
      
      {hero?.imageUrl && (
        <img 
          src={hero.imageUrl} 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}
      
      <div className="container mx-auto px-6 relative z-20 text-white">
        <h1 className="text-3xl md:text-5xl font-bold max-w-xl leading-[1.1] mb-6">
          {hero?.title ? (
            <>
              {hero.title} <br />
              {hero.subtitle && <span className="text-blue-500 font-extrabold uppercase">{hero.subtitle}</span>}
            </>
          ) : (
            <>
              Todo lo que necesitas <br /> 
              <span className="text-blue-500 font-extrabold uppercase">necesita hoy.</span>
            </>
          )}
        </h1>
        <Link to={hero?.link || "/Catalogo"}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-md font-semibold text-sm transition-all shadow-lg active:scale-95 cursor-pointer">
            {hero?.buttonText ? hero.buttonText.toUpperCase() : "VER CATÁLOGO COMPLETO"}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
