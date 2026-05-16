import React, { useEffect, useState } from 'react';
import { Banner } from './Banner';
import PromoBanner from './PromoBanner';
import Hero from './Hero';
import TrustGrid from './TrustGrid';
import { CategoriesGrid } from './CategoriesGrid';
import { FeaturesAndBrands } from './FeaturesAndBrands';
import ProductGrid from './ProductGrid';
import { db } from "../fireBase/config";
import { collection, getDocs, query, limit } from "firebase/firestore";

const HomeContent = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const q = query(collection(db, "productos"), limit(20));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(docs);
      } catch (error) {
        console.error(error);
      } finaly {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <Banner />
      <PromoBanner />
      <Hero />
      <TrustGrid />
      <CategoriesGrid />
      <FeaturesAndBrands productos={productos} />
      <ProductGrid productos={productos} loading={loading} />
    </main>
  );
};

export default HomeContent;
