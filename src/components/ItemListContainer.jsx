import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router';
import { db } from "../fireBase/config";
import { collection, query, where, limit, getDocs, startAfter, orderBy } from "firebase/firestore";
import { Item } from './Item';
import { Loader } from './Loader';
import { Home, LayoutGrid, ChevronDown } from 'lucide-react';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [searchParams] = useSearchParams();
  const { categoryName: paramsCategory } = useParams();
  const categoryName = searchParams.get("category") || paramsCategory;

  const fetchProducts = async (isInitial = true) => {
    try {
      isInitial ? setLoading(true) : setLoadingMore(true);
      
      let q = collection(db, "productos");
      let constraints = [orderBy("titulo"), limit(8)];

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

  if (loading) return <Loader />;

  return (
    <section className="py-8 bg-[#f9f9f9] min-h-screen">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-8 bg-white w-fit px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
          <Link to="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Home size={14} /> <span>INICIO</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-blue-600 uppercase tracking-wider">{categoryName || "Catálogo"}</span>
        </nav>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <Item key={p.id} item={p} />
          ))}
        </div>

        {lastDoc && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => fetchProducts(false)}
              disabled={loadingMore}
              className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {loadingMore ? 'Cargando...' : <>Ver más productos <ChevronDown size={16} /></>}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemListContainer;
