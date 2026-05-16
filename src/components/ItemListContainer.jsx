import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router';
import { db } from "../fireBase/config";
import { collection, query, where, limit, getDocs, startAfter, orderBy } from "firebase/firestore";
import { Item } from './Item';
import { Loader } from './Loader';
import { Home, LayoutGrid, ChevronDown, Truck } from 'lucide-react';

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const [searchParams] = useSearchParams();
  const { categoryName: paramsCategory } = useParams();
  
  const categoryName = searchParams.get("category") || paramsCategory;
  const searchQuery = searchParams.get("search");

  const fetchProducts = async (isInitial = true) => {
    try {
      isInitial ? setLoading(true) : setLoadingMore(true);

      let q = collection(db, "items");
      let constraints = [orderBy("nombre"), limit(8)];

      if (categoryName) {
        constraints.unshift(where("categoria", "==", categoryName));
      }

      if (!isInitial && lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(query(q, ...constraints));
      const newProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setProducts(prev => isInitial ? newProducts : [...prev, ...newProducts]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, [categoryName]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const cleanSearch = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.nombre?.toLowerCase().includes(cleanSearch) || 
        p.descripcion?.toLowerCase().includes(cleanSearch) ||
        p.categoria?.toLowerCase().includes(cleanSearch)
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
  }, [products, searchQuery, onlyFreeShipping, sortOrder]);

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
              {categoryName || (searchQuery ? `Búsqueda: ${searchQuery}` : "Catálogo")}
            </h1>
            <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{filteredAndSortedProducts.length} productos</span>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((p) => (
              <Item key={p.id} item={p} />
            ))}
          </div>
        )}

        {lastDoc && !searchQuery && (
          <div className="flex justify-center mt-12">
            <button onClick={() => fetchProducts(false)} disabled={loadingMore} className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 shadow-md disabled:opacity-50">
              {loadingMore ? 'Cargando...' : <>Ver más productos <ChevronDown size={16} /></>}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
