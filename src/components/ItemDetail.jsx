import React from 'react';
import { Link } from 'react-router';
import { Home, ChevronRight, ShieldCheck, Truck, RefreshCw, Star, ArrowRight, LayoutGrid } from 'lucide-react';
import { ItemCount } from './ItemCount';

export const ItemDetail = ({ item }) => {
  return (
    <div className="py-8 animate-in fade-in duration-700 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-8 bg-white w-fit px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
          <Link to="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Home size={14} strokeWidth={2.5} /> <span>INICIO</span>
          </Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link to="/Catalogo" className="hover:text-blue-600 transition-colors">CATÁLOGO</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-blue-600 uppercase tracking-wider truncate max-w-[150px]">
            {item.titulo}
          </span>
        </nav>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white p-8 lg:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-50">
              <div className="relative group w-full aspect-square flex items-center justify-center">
                <img 
                  src={item.imagenUrl || item.img} 
                  alt={item.titulo} 
                  className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
                {item.envioGratis && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
                    ENVÍO GRATIS
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 lg:p-16 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase italic">Verificado</span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase">
                {item.titulo}
              </h1>

              <p className="text-gray-500 text-base lg:text-lg mb-8 leading-relaxed">
                {item.descripcion}
              </p>

              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-black text-blue-600">${item.precio}</span>
                {item.precioAnterior && (
                  <span className="text-lg text-gray-300 line-through font-bold">${item.precioAnterior}</span>
                )}
              </div>

              <p className="text-[10px] font-black text-gray-400 mb-8 tracking-widest uppercase">
                Stock: {item.stock} unidades
              </p>

              <div className="bg-gray-50 rounded-3xl p-6 lg:p-8 mb-8 border border-gray-100">
                <ItemCount item={item} />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-auto">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Truck size={18} /></div>
                  <span className="text-[8px] font-black text-gray-400 uppercase">Envío Seguro</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><ShieldCheck size={18} /></div>
                  <span className="text-[8px] font-black text-gray-400 uppercase">Garantía</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><RefreshCw size={18} /></div>
                  <span className="text-[8px] font-black text-gray-400 uppercase">Cambio Fácil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
