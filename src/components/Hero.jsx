import React from 'react';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <section className="relative bg-black h-[350px] md:h-[480px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
      <img 
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
        alt="Hero" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="container mx-auto px-6 relative z-20 text-white">
        <h1 className="text-3xl md:text-5xl font-bold max-w-xl leading-[1.1] mb-6">
          Todo lo que necesitas <br /> 
          <span className="text-blue-500 font-extrabold uppercase">necesita hoy.</span>
        </h1>
        <Link to="/Catalogo">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-md font-semibold text-sm transition-all shadow-lg active:scale-95 cursor-pointer">
            VER CATÁLOGO COMPLETO
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;