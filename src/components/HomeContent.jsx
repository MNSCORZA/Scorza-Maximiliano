import React from 'react';
import { Banner } from './Banner';
import PromoBanner from './PromoBanner';
import Hero from './Hero';
import TrustGrid from './TrustGrid';
import { CategoriesGrid } from './CategoriesGrid';
import { FeaturesAndBrands } from './FeaturesAndBrands';
import { DiscountGrid } from './DiscountGrid';
import { HistoryGrid } from './HistoryGrid';
import ProductGrid from './ProductGrid';

const HomeContent = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans pb-12">
      <Banner />
      <PromoBanner />
      <Hero />
      <TrustGrid />
      <CategoriesGrid />
      
      <DiscountGrid />
      
      <HistoryGrid />

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-10">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-md sm:text-lg font-black text-gray-900 uppercase tracking-tight">
            Nuestro Catálogo
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Explorá todos los productos disponibles
          </p>
        </div>
        <ProductGrid />
      </section>

      <FeaturesAndBrands />
    </main>
  );
};

export default HomeContent;
