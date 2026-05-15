import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router';
import { useProducts } from '../hooks/useProducts';
import { Item } from './Item';
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

  if (loading) return <Loader />;

  return (
    <section className="py-8 bg-[#f9f9f9] min-h-screen">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-8 bg-white w-fit px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
          <Link to="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Home size={14} strokeWidth={2.5} /> <span>INICIO</span>
          </Link>
          <span className="text-gray-300">/</span>
          <Link to="/Catalogo" className={`flex items-center gap-1.5 hover:text-blue-600 transition-colors ${!categoryName ? "text-blue-600" : ""}`}>
            <LayoutGrid size={14} strokeWidth={2.5} /> <span>CATÁLOGO</span>
          </Link>
          {categoryName && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-blue-600 uppercase tracking-wider">{categoryName}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase">
              {categoryName || (searchQuery ? `Resultados: "${searchQuery}"` : "Catálogo")}
            </h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase mt-1 tracking-widest">{finalProducts.length} productos</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="flex-1 lg:flex-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-[11px] font-black outline-none focus:border-blue-600/30">
              <option value="">ORDENAR POR</option>
              <option value="asc">MENOR PRECIO</option>
              <option value="desc">MAYOR PRECIO</option>
            </select>
            <button onClick={() => setOnlyFreeShipping(!onlyFreeShipping)} className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl border font-black text-[11px] transition-all ${onlyFreeShipping ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600'}`}>
              <Truck size={16} /> ENVÍO GRATIS
            </button>
          </div>
        </div>

        {finalProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {finalProducts.map((p) => (
              <Item key={p.id} item={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-500 font-bold uppercase text-sm">Sin resultados</p>
            <button onClick={() => {setOnlyFreeShipping(false); setSortOrder("");}} className="mt-4 text-blue-600 font-black text-xs uppercase hover:underline">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemListContainer;
