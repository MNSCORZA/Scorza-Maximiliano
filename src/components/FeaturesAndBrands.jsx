import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export const FeaturesAndBrands = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const brands = [
    { name: 'Osram', logo: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=120&auto=format&fit=crop&q=60' },
    { name: 'Bosch', logo: 'https://images.unsplash.com/photo-1530124560072-aab9aef1988b?w=120&auto=format&fit=crop&q=60' },
    { name: 'Philips', logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=60' },
    { name: 'X-28', logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=120&auto=format&fit=crop&q=60' },
  ];

  return (
    <section className="py-12 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-7xl space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-blue-950 text-white shadow-xl">
          <div className="p-8 md:p-12 lg:col-span-2 flex flex-col justify-between space-y-6">
            <div>
              <span className="bg-orange-500 text-white font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                OFERTA EXCLUSIVA DEL DÍA
              </span>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight mt-4 leading-tight">
                ¡Renová los accesorios de tu auto con hasta <span className="text-orange-400">40% OFF</span>!
              </h3>
              <p className="text-sm text-gray-300 mt-2 max-w-xl">
                Promoción válida solo por hoy o hasta agotar stock para envíos a Laferrere y alrededores. ¡No te lo pierdas!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Termina en:</span>
              <div className="flex gap-2">
                {[
                  { label: 'H', value: timeLeft.hours },
                  { label: 'M', value: timeLeft.minutes },
                  { label: 'S', value: timeLeft.seconds }
                ].map((time, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-orange-400 tabular-nums">
                      {String(time.value).padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-600/20 border-t lg:border-t-0 lg:border-l border-white/10 p-8 flex flex-col justify-center items-start lg:items-center text-left lg:text-center relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10 space-y-4 w-full lg:max-w-xs">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">¿Qué estás esperando?</div>
              <div className="text-xl font-extrabold tracking-tight">Envío prioritario bonificado en tu compra</div>
              <Link to="/Catalogo" className="block w-full">
                <button className="w-full bg-white text-gray-900 hover:bg-orange-500 hover:text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md">
                  <span>Aprovechar Oferta</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Garantía de Calidad</span>
            <h4 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">Trabajamos con las mejores marcas</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-60 hover:opacity-90 transition-opacity duration-300">
            {brands.map((brand, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 border border-gray-150 rounded-xl p-4 w-full h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              >
                <span className="font-black text-gray-400 tracking-widest text-sm uppercase">{brand.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
