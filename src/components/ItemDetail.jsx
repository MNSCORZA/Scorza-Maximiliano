import React, { useContext } from 'react';
import { Link } from 'react-router';
import { Home, ChevronRight, ShieldCheck, Truck, RefreshCw, Star, Heart } from 'lucide-react';
import { ItemCount } from './ItemCount';
import { useAuth } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';

export const ItemDetail = ({ item }) => {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const isFav = isFavorite(item?.id);

  return (
    <div className="py-6 sm:py-12 animate-in fade-in duration-500 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-6xl">

        <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-6 bg-white w-fit px-4 py-2 rounded-full shadow-sm border border-slate-100/80">
          <Link to="/" className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
            <Home size={12} strokeWidth={2.5} /> <span>INICIO</span>
          </Link>
          <ChevronRight size={10} className="text-slate-300" />
          <Link to="/Catalogo" className="hover:text-slate-800 transition-colors">CATÁLOGO</Link>
          <ChevronRight size={10} className="text-slate-300" />
          <span className="text-slate-800 uppercase tracking-wider truncate max-w-[120px] sm:max-w-none">
            {item.titulo}
          </span>
        </nav>

        <div className="bg-white rounded-3xl shadow-md shadow-slate-100/80 border border-slate-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-12 flex items-center justify-center relative min-h-[350px] lg:min-h-[500px]">
              <div className="relative w-full h-full max-h-[400px] flex items-center justify-center mix-blend-multiply">
                <img 
                  src={item.imagenUrl || item.img} 
                  alt={item.titulo} 
                  className="max-h-full max-w-[85%] object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              {user && (
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-4 right-4 z-20 p-3 rounded-2xl bg-white border border-slate-100 shadow-md hover:bg-slate-50 text-slate-400 hover:text-rose-500 transition-all duration-300 active:scale-90"
                >
                  <Heart 
                    size={20} 
                    fill={isFav ? "#f43f5e" : "none"} 
                    className={isFav ? "text-rose-500 scale-105" : "transition-transform"} 
                  />
                </button>
              )}

              {item.envioGratis && (
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-md shadow-sm">
                  ENVÍO GRATIS
                </div>
              )}
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" stroke="none" />)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                    Garantizado
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase leading-none">
                  {item.titulo}
                </h1>

                <p className="text-slate-500 text-sm sm:text-base mb-6 leading-relaxed font-normal">
                  {item.descripcion}
                </p>

                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    ${item.precio}
                  </span>
                  {item.precioAnterior && (
                    <span className="text-base text-slate-300 line-through font-semibold">
                      ${item.precioAnterior}
                    </span>
                  )}
                </div>

                <p className={`text-[11px] font-bold mb-6 tracking-wide ${item.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {item.stock > 0 ? `✓ Stock disponible: ${item.stock} unidades` : '⚠️ Sin stock por el momento'}
                </p>
              </div>

              <div className="space-y-6">
                {item.stock > 0 && (
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                    <ItemCount item={item} />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="w-9 h-9 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center"><Truck size={16} /></div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Envío Rápido</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="w-9 h-9 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center"><ShieldCheck size={16} /></div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Compra Segura</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="w-9 h-9 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center"><RefreshCw size={16} /></div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Cambio Oficial</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
