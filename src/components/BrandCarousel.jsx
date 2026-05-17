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
    <div className="pt-4">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.25em] block mb-2">
          Garantía de Calidad
        </span>
        <h4 className="text-xl font-black text-white uppercase tracking-tight sm:text-2xl">
          Trabajamos con las mejores marcas
        </h4>
      </div>

      <div className="flex overflow-x-auto pb-6 gap-5 snap-x snap-mandatory scrollbar-none px-2">
        {marcas.map((brand) => (
          <motion.div
            key={brand.id}
            whileHover={{ y: -5, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 min-w-[150px] sm:min-w-[190px] h-24 flex items-center justify-center hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-all duration-300 snap-center shrink-0 shadow-lg relative overflow-hidden group select-none cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl pointer-events-none group-hover:from-indigo-500/30" />

            <span className="font-black bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent tracking-[0.2em] text-xs sm:text-sm uppercase select-none relative z-10 transition-all group-hover:from-white group-hover:to-indigo-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              {brand.nombre}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
