import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion"; // <-- Importamos Framer Motion

export const Item = ({ item, index }) => { // <-- Recibimos el index para el efecto escalonado
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const hasStock = item?.stock > 0;
  
  // Evaluamos si cumple con las condiciones visuales del ProductCard
  const isBestSeller = item?.ventas > 50;
  const isOffer = item?.precioAnterior && Number(item?.precioAnterior) > Number(item?.precio);

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart({ ...item, cantidad: 1 });

    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log("Audio play blocked"));

    toast.success('¡Agregado con éxito!', {
      description: `1x ${item?.titulo} ya está en tu carrito.`,
      style: { borderRadius: '12px', padding: '16px' },
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: (index || 0) * 0.05, duration: 0.4, ease: "easeOut" }}
      onClick={() => hasStock && navigate(`/item/${item?.id}`)}
      className={`group bg-white border border-gray-150 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative ${!hasStock ? 'opacity-75' : ''}`}
    >
      <div>
        {/* Contenedor de la Imagen igual a ProductCard */}
        <div className="h-40 relative overflow-hidden mb-4 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {isOffer && hasStock && (
              <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-wider">
                OFERTA
              </span>
            )}
            {isBestSeller && hasStock && (
              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-wider">
                TOP VENTAS
              </span>
            )}
          </div>

          <img 
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            src={item?.imagenUrl || item?.img}
            alt={item?.titulo}
            loading="lazy"
          />

          {!hasStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Sin Stock</span>
            </div>
          )}
        </div>

        {item?.categoria && (
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">
            {item?.categoria}
          </span>
        )}

        {/* Título formateado a minúsculas con line-clamp y color dinámico al hacer hover */}
        <h3 className="text-xs font-semibold text-gray-800 h-9 line-clamp-2 tracking-tight leading-tight group-hover:text-blue-600 transition-colors mb-2">
          {item?.titulo?.toLowerCase()}
        </h3>

        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter block mb-2">
          {hasStock ? `${item?.stock} disponibles` : 'Agotado'}
        </span>
      </div>

      {/* Footer de la tarjeta: Precios y botón */}
      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex flex-col min-h-[40px] justify-end">
          {isOffer && hasStock && (
            <span className="text-[11px] text-gray-400 line-through font-medium mb-0.5">
              ${item?.precioAnterior?.toLocaleString('es-AR')}
            </span>
          )}
          <div className="text-xl font-black text-gray-900 tracking-tight leading-none">
            ${item?.precio?.toLocaleString('es-AR')}
          </div>
        </div>

        <button 
          onClick={handleAddToCart} 
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
