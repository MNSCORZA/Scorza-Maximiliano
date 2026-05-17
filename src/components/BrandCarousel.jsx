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
    <div className="w-full bg-slate-50/60 border-t border-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] block mb-2">
            Garantía de Calidad
          </span>
          <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight sm:text-2xl">
            Trabajamos con las mejores marcas
          </h4>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scrollbar-none px-2">
          {marcas.map((brand) => (
            <motion.div
              key={brand.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 min-w-[155px] sm:min-w-[190px] h-24 flex items-center justify-center hover:border-blue-500/30 hover:shadow-[0_12px_20px_-8px_rgba(59,130,246,0.15)] transition-all duration-300 snap-center shrink-0 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.04)] relative overflow-hidden group select-none cursor-default"
            >
              {/* Brillo dinámico de fondo en hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="font-black bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent tracking-[0.2em] text-xs sm:text-sm uppercase select-none relative z-10 transition-colors group-hover:from-blue-600 group-hover:to-indigo-600">
                {brand.nombre}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
