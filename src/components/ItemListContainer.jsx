import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import { Loader } from './Loader';
import { Truck, Home, LayoutGrid } from 'lucide-react';

const ItemListContainer = () => {
  const [searchParams] = useSearchParams();
  const { categoryName: paramsCategory } = useParams();
  
  const categoryName = searchParams.get("category") || paramsCategory;
  const searchQuery = searchParams.get("search") || "";
  
  const { products, loading } = useProducts(categoryName, searchQuery);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const finalProducts = useMemo(() => {
    let result = [...products];
    if (onlyFreeShipping) result = result.filter(p => p.envioGratis);
    if (sortOrder === "asc") result.sort((a, b) => a.precio - b.precio);
    else if (sortOrder === "desc") result.sort((a, b) => b.precio - a.precio);
    return result;
  }, [products, onlyFreeShipping, sortOrder]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-8 bg-[#f9f9f9] min-h-screen">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-8 bg-white w-fit px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
          <Link to="/" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            <Home size={14} strokeWidth={2.5} /> 
            <span>INICIO</span>
          </Link>
          <span className="text-gray-300 font-light text-sm">/</span>
          <Link to="/Catalogo" className={`flex items-center gap-1.5 hover:text-indigo-600 transition-colors ${!categoryName ? "text-indigo-600" : ""}`}>
            <LayoutGrid size={14} strokeWidth={2.5} />
            <span>CATÁLOGO</span>
          </Link>
          {categoryName && (
            <>
              <span className="text-gray-300 font-light text-sm">/</span>
              <span className="text-indigo-600 uppercase tracking-wider">{categoryName}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight">
              {categoryName || (searchQuery ? `Resultados: "${searchQuery}"` : "Catálogo Completo")}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{finalProducts.length} productos encontrados</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="flex-1 lg:flex-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[12px] font-bold outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option value="">ORDENAR POR</option>
              <option value="asc">Menor precio</option>
              <option value="desc">Mayor precio</option>
            </select>
            <button onClick={() => setOnlyFreeShipping(!onlyFreeShipping)} className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border font-bold text-[12px] transition-all ${onlyFreeShipping ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600'}`}>
              <Truck size={16} /> ENVÍO GRATIS
            </button>
          </div>
        </div>

        {finalProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No encontramos productos que coincidan con tu búsqueda.</p>
            <button onClick={() => {setOnlyFreeShipping(false); setSortOrder("");}} className="mt-4 text-indigo-600 font-bold hover:underline">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemListContainer;