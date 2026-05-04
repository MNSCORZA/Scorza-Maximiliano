import React, { useEffect, useState } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router';
import { ProductSkeleton } from './ProductSkeleton';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) { 
        console.error(e); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-[#f9f9f9]">
      <div className="container mx-auto px-6 flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Destacados</h2>
        <Link to="/Catalogo">
          <button className="text-blue-600 text-xs font-bold hover:underline uppercase cursor-pointer">Ver todos</button>
        </Link>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
        }
      </div>
    </section>
  );
};

export default ProductGrid;