import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const hasStock = product.stock > 0;

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (hasStock) {
      addToCart({ ...product, cantidad: 1 });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => hasStock && navigate(`/item/${product.id}`)}
      className={`group bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all flex flex-col cursor-pointer ${!hasStock ? 'opacity-75' : ''}`}
    >
      <div className="h-44 bg-white border-b border-gray-100 mb-3 overflow-hidden rounded-md relative">
        <img 
          src={product.imagenUrl || "https://via.placeholder.com/300"} 
          alt={product.titulo} 
          className={`w-full h-full object-contain group-hover:scale-105 transition-transform ${!hasStock ? 'grayscale' : ''}`} 
        />
        
        {!hasStock && (
          <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              SIN STOCK
            </span>
          </div>
        )}
      </div>

      <h3 className="text-[14px] text-gray-800 line-clamp-2 leading-tight mb-2 h-9">
        {product.titulo}
      </h3>

      <div className="mt-auto">
        <div className="text-2xl font-semibold text-gray-900">${product.precio?.toLocaleString('es-AR')}</div>
        
        <div className="flex items-center gap-1.5 mb-3">
          <div className={`w-1.5 h-1.5 rounded-full ${hasStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-[11px] font-bold uppercase tracking-tighter ${hasStock ? 'text-green-600' : 'text-red-600'}`}>
            {hasStock ? `${product.stock} disponibles` : 'Sin stock'}
          </span>
        </div>

        <button 
          onClick={handleAddClick}
          disabled={!hasStock}
          className={`w-full py-2 rounded font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
            hasStock 
            ? 'bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart style={{ width: '16px', height: '16px' }} /> 
          {hasStock ? 'AGREGAR AL CARRITO' : 'AGOTADO'}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;