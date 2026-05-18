import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { db } from "../fireBase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Item } from './Item';
import { Loader } from './Loader';
import { CatalogHeader } from './CatalogHeader';
import { Home, LayoutGrid } from 'lucide-react';

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  useEffect(() => {
    setVisibleCount(8);
  }, [categoryParam, searchParam]);

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

    if (categoryParam) {
      const cleanCategoryTarget = cleanText(categoryParam);
      result = result.filter(p => cleanText(p.categoria) === cleanCategoryTarget);
    }

    if (searchParam) {
      const cleanSearchTarget = cleanText(searchParam);
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
  }, [products, categoryParam, searchParam, onlyFreeShipping, sortOrder]);

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

        <CatalogHeader 
          category={categoryParam}
          search={searchParam}
          totalCount={filteredAndSortedProducts.length}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onlyFreeShipping={onlyFreeShipping}
          setOnlyFreeShipping={setOnlyFreeShipping}
        />

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
              {displayedProducts.map((p, index) => (
                <Item key={p.id} item={p} index={index} />
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
