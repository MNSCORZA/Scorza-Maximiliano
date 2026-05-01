import React, { useEffect, useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router';

const ProductCard = ({ product }) => (
  <div className="group bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow flex flex-col">
    <div className="h-44 bg-white border-b border-gray-100 mb-3 overflow-hidden rounded-md relative">
      <img 
        src={product.imagenUrl || "https://via.placeholder.com/300"} 
        alt={product.nombre} 
        className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
      />
      {product.envioGratis && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          ENVÍO GRATIS
        </div>
      )}
    </div>
    <h3 className="text-[14px] text-gray-800 line-clamp-2 leading-tight mb-2 h-9">
      {product.nombre}
    </h3>
    <div className="mt-auto">
      <div className="text-2xl font-semibold text-gray-900">${product.precio?.toLocaleString('es-AR')}</div>
      <div className="text-[11px] text-green-600 font-bold mb-3 uppercase tracking-tighter">
        {product.cuotas ? `Mismo precio en ${product.cuotas} cuotas` : 'Efectivo / Transferencia'}
      </div>
      <button className="w-full bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white py-2 rounded font-bold text-xs transition-colors flex items-center justify-center gap-2">
        <ShoppingCart style={{ width: '16px', height: '16px' }} /> AGREGAR AL CARRITO
      </button>
    </div>
  </div>
);

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <section className="py-12 bg-[#f9f9f9]">
      <div className="container mx-auto px-6 flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Destacados</h2>
        <Link to="/Catalogo">
          <button className="text-blue-600 text-xs font-bold hover:underline uppercase cursor-pointer">Ver todos</button>
        </Link>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
};

export default ProductGrid;