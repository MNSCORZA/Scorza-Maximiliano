import React, { useEffect, useState } from 'react';
import { getPaginatedItems } from '../fireBase/dataBase';
import { Link } from 'react-router';
import { ProductSkeleton } from './ProductSkeleton';
import { Item } from './Item';

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between mb-10">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
          Productos <span className="text-blue-600">Destacados</span>
        </h2>
        <Link to="/Catalogo">
          <button className="text-blue-600 text-xs font-black hover:text-blue-800 uppercase tracking-wider cursor-pointer transition-colors border-b-2 border-transparent hover:border-blue-800 pb-0.5">
            Ver todo el catálogo →
          </button>
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-7xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product, index) => (
              <Item key={product.id} item={product} index={index} />
            ))
        }
      </div>

      {lastDoc && !loading && (
        <div className="flex justify-center mt-14">
          <button 
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-white border border-gray-300 text-gray-700 px-12 py-3 rounded-xl font-bold text-xs hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow active:scale-95 disabled:opacity-50 cursor-pointer uppercase tracking-wider"
          >
            {loadingMore ? 'Cargando productos...' : 'Mostrar más artículos'}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
