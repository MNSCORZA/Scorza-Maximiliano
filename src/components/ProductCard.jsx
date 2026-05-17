import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const hasStock = product.stock > 0;
  const isBestSeller = product.ventas > 50;
  const isOffer = product.precioAnterior && Number(product.precioAnterior) > Number(product.precio);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart({ ...product, cantidad: 1 });

    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log("Audio play blocked"));

    toast('¡Agregado con éxito!', {
      description: `1x ${product.titulo} ya está en tu carrito.`,
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => hasStock && navigate(`/item/${product.id}`)}
      className="group bg-white border border-gray-150 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative"
    >
      <div>
        <div className="h-40 relative overflow-hidden mb-4 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {isOffer && (
              <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-wider">
                OFERTA
              </span>
            )}
            {isBestSeller && (
              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-wider">
                TOP VENTAS
              </span>
            )}
          </div>

          <img 
            src={product.imagenUrl} 
            alt={product.titulo} 
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
            loading="lazy"
          />
        </div>

        {product.categoria && (
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">
            {product.categoria}
          </span>
        )}

        <h3 className="text-xs font-semibold text-gray-800 h-9 line-clamp-2 tracking-tight leading-tight group-hover:text-blue-600 transition-colors mb-2">
          {product.titulo.toLowerCase()}
        </h3>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex flex-col min-h-[40px] justify-end">
          {isOffer && (
            <span className="text-[11px] text-gray-400 line-through font-medium mb-0.5">
              ${product.precioAnterior?.toLocaleString('es-AR')}
            </span>
          )}
          <div className="text-xl font-black text-gray-900 tracking-tight leading-none">
            ${product.precio?.toLocaleString('es-AR')}
          </div>
        </div>

        <button 
          onClick={handleQuickAdd} 
          disabled={!hasStock} 
          className={`w-full mt-3 py-2.5 rounded-lg font-bold text-[11px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm
            ${hasStock 
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer shadow-blue-100' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none'
            }`}
        >
          {hasStock ? (
            <>
              <ShoppingCart size={13} />
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

export default ProductCard;
