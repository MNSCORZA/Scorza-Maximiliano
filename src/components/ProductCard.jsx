import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const hasStock = product.stock > 0;
  const isBestSeller = product.ventas > 50;
  const isOffer = product.precioAnterior > product.precio;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      onClick={() => hasStock && navigate(`/item/${product.id}`)}
      className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col cursor-pointer"
    >
      <div className="h-44 relative overflow-hidden mb-3">
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {isOffer && <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-sm">OFERTA</span>}
          {isBestSeller && <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm">TOP VENTAS</span>}
        </div>
        <img src={product.imagenUrl} alt={product.titulo} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-[14px] font-medium h-9 line-clamp-2">{product.titulo}</h3>
      <div className="mt-auto">
        {isOffer && <span className="text-xs text-gray-400 line-through">${product.precioAnterior}</span>}
        <div className="text-2xl font-black">${product.precio?.toLocaleString('es-AR')}</div>
        <button onClick={(e) => { e.stopPropagation(); addToCart({...product, cantidad: 1}); }} disabled={!hasStock} className="w-full mt-3 py-2 bg-indigo-600 text-white rounded font-bold text-[11px]">
          {hasStock ? 'AGREGAR AL CARRITO' : 'AGOTADO'}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;