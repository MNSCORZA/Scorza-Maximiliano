import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { useSoundEffect } from "../hooks/useSoundEffect";
import { toast } from "sonner";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";

export const Item = ({ item, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const playCartSound = useSoundEffect('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3', 0.5);
  
  const hasStock = item?.stock > 0;
  const isBestSeller = item?.ventas > 50;
  const isOffer = item?.precioAnterior && Number(item?.precioAnterior) > Number(item?.precio);
  const isFav = isFavorite(item?.id);

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart({ ...item, cantidad: 1 });
    playCartSound();

    toast('¡Agregado al carrito!', {
      description: `1x ${item?.titulo} listo para llevar.`,
      duration: 3000,
      style: {
        borderRadius: '16px',
        padding: '12px 16px',
        background: '#0f172a',
        color: '#ffffff',
        border: 'none'
      }
    });
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: (index || 0) * 0.05, duration: 0.4, ease: "easeOut" }}
      onClick={() => hasStock && navigate(`/item/${item?.id}`)}
      className={`group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative ${!hasStock ? 'opacity-70' : ''}`}
    >
      <div>
        <div className="h-40 relative overflow-hidden mb-4 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100/60">
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {isOffer && hasStock && (
              <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">
                Oferta
              </span>
            )}
            {isBestSeller && hasStock && (
              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">
                Top Ventas
              </span>
            )}
          </div>

          {user && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-2 right-2 z-20 p-2 rounded-xl bg-white/70 backdrop-blur-md border border-gray-100/40 shadow-sm hover:bg-white text-slate-400 hover:text-rose-500 transition-all duration-300 active:scale-90"
            >
              <Heart 
                size={14} 
                fill={isFav ? "#f43f5e" : "none"} 
                className={isFav ? "text-rose-500 scale-105" : "transition-transform group-hover:scale-105"} 
              />
            </button>
          )}

          <img 
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            src={item?.imagenUrl || item?.img}
            alt={item?.titulo}
            loading="lazy"
          />

          {!hasStock && (
            <div className="absolute inset-0 bg-[#0f172a]/40 flex items-center justify-center z-10 backdrop-blur-[1px]">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">Sin Stock</span>
            </div>
          )}
        </div>

        {item?.categoria && (
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
            {item?.categoria}
          </span>
        )}

        <h3 className="text-xs font-bold text-gray-800 h-9 line-clamp-2 tracking-tight leading-tight group-hover:text-blue-600 transition-colors mb-1">
          {item?.titulo}
        </h3>

        <span className="text-[10px] font-medium text-gray-400 block mb-2">
          {hasStock ? `Disponibles: ${item?.stock} u.` : 'Agotado'}
        </span>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-50">
        <div className="flex flex-col min-h-[38px] justify-end">
          {isOffer && hasStock && (
            <span className="text-[10px] text-gray-400 line-through font-medium mb-0.5">
              ${item?.precioAnterior?.toLocaleString('es-AR')}
            </span>
          )}
          <div className="text-lg font-black text-gray-900 tracking-tight leading-none">
            ${item?.precio?.toLocaleString('es-AR')}
          </div>
        </div>

        <button 
          onClick={handleAddToCart} 
          disabled={!hasStock} 
          className={`w-full mt-3 py-2.5 rounded-xl font-bold text-[11px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm
            ${hasStock 
              ? 'bg-[#0f172a] text-white hover:bg-slate-800 active:scale-95 cursor-pointer shadow-slate-100' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none'
            }`}
        >
          {hasStock ? (
            <>
              <ShoppingCart size={12} />
              <span>Agregar</span>
            </>
          ) : (
            'AGOTADO'
          )}
        </button>
      </div>
    </motion.div>
  );
};
