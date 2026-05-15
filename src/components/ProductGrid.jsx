import React, { useEffect, useState } from 'react';
import { getPaginatedItems } from '../fireBase/database'; // Ajustá la ruta si es necesario
import { Link } from 'react-router';
import { ProductSkeleton } from './ProductSkeleton';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchInitialProducts = async () => {
    try {
      setLoading(true);
      const { products: initialProducts, lastDoc: nextCursor } = await getPaginatedItems(null, 8);
      setProducts(initialProducts);
      setLastDoc(nextCursor);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!lastDoc || loadingMore) return;
    try {
      setLoadingMore(true);
      const { products: newProducts, lastDoc: nextCursor } = await getPaginatedItems(lastDoc, 8);
      setProducts(prev => [...prev, ...newProducts]);
      setLastDoc(nextCursor);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchInitialProducts();
  }, []);

  return (
    <section className="py-12 bg-[#f9f9f9]">
      <div className="container mx-auto px-6 flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Destacados</h2>
        <Link to="/Catalogo">
          <button className="text-blue-600 text-xs font-bold hover:underline uppercase cursor-pointer">Ver todos</button>
        </Link>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
        }
      </div>

      {lastDoc && !loading && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-2.5 rounded-md font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loadingMore ? 'CARGANDO...' : 'MOSTRAR MÁS'}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
