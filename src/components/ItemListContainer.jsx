import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { db } from "../fireBase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Item } from './Item';
import { Loader } from './Loader';
import { Home, LayoutGrid, Truck } from 'lucide-react';

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [urlParams, setUrlParams] = useState({ category: null, search: null });
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      setUrlParams({
        category: params.get("category"),
        search: params.get("search")
      });
      setVisibleCount(8);
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [window.location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "productos"), orderBy("titulo"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(docs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    const cleanText = (text) => {
      if (!text) return "";
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    };

    if (urlParams.category) {
      const cleanCategoryTarget = cleanText(urlParams.category);
      result = result.filter(p => cleanText(p.categoria) === cleanCategoryTarget);
    }

    if (urlParams.search) {
      const cleanSearchTarget = cleanText(urlParams.search);
      result = result.filter(p => 
        cleanText(p.titulo).includes(cleanSearchTarget) || 
        cleanText(p.descripcion).includes(cleanSearchTarget)
      );
    }

    if (onlyFreeShipping) {
      result = result.filter(p => p.envioGratis);
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.precio - b.precio);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.precio - a.precio);
    }

    return result;
  }, [products, urlParams, onlyFreeShipping, sortOrder]);

  const displayedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  if (loading) return <Loader />;

  return (
    <section className="py-8 bg-[#f9f9f9] min-h-screen">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-6 bg-white w-fit px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
          <Link to="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Home size={14} /> <span>INICIO</span>
          </Link>
          <span className="text-gray-300">/</span>
          <Link to="/Catalogo" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
             <LayoutGrid size={14} /> <span>CATÁLOGO</span>
          </Link>
        </nav>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-gray-900 uppercase leading-none">
              {urlParams.category || (urlParams.search ? `Búsqueda: ${urlParams.search}` : "Catálogo")}
            </h1>
            <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "producto" : "productos"}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="flex-1 lg:flex-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[11px] font-black uppercase outline-none focus:border-blue-600/30">
              <option value="">ORDENAR POR</option>
              <option value="asc">Menor precio</option>
              <option value="desc">Mayor precio</option>
            </select>
            <button onClick={() => setOnlyFreeShipping(!onlyFreeShipping)} className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border font-black text-[11px] transition-all ${onlyFreeShipping ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600'}`}>
              <Truck size={16} /> ENVÍO GRATIS
            </button>
          </div>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-md mx-auto mt-12 shadow-sm">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">No se encontraron productos</p>
            <Link 
              to="/Catalogo" 
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-sm no-underline"
            >
              Ver todo el catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map((p) => (
                <Item key={p.id} item={p} />
              ))}
            </div>

            {filteredAndSortedProducts.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={handleLoadMore} 
                  className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Ver más productos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
