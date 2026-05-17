import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../fireBase/config';
import { collection, getDocs } from 'firebase/firestore';

export const BrandCarousel = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "marcas"));
        const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMarcas(lista);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarcas();
  }, []);

  if (marcas.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800/60 py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.25em] block mb-2">
            Garantía de Calidad
          </span>
          <h4 className="text-xl font-black text-white uppercase tracking-tight sm:text-2xl">
            Trabajamos con las mejores marcas
          </h4>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scrollbar-none px-2">
          {marcas.map((brand) => (
            <motion.div
              key={brand.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 min-w-[155px] sm:min-w-[190px] h-24 flex items-center justify-center hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300 snap-center shrink-0 shadow-2xl relative overflow-hidden group select-none cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-px bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none group-hover:from-indigo-500/20" />

              {brand.logoUrl ? (
                <img 
                  src={brand.logoUrl} 
                  alt={brand.nombre} 
                  className="max-w-full max-h-[70%] object-contain filter brightness-90 contrast-125 group-hover:brightness-110 transition-all duration-300"
                  loading="lazy"
                />
              ) : (
                <span className="font-black bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent tracking-[0.2em] text-xs sm:text-sm uppercase select-none relative z-10 transition-all group-hover:from-white group-hover:to-indigo-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {brand.nombre}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
