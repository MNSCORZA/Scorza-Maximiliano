import React from 'react';
import { Banner } from './Banner';
import PromoBanner from './PromoBanner';
import Hero from './Hero';
import TrustGrid from './TrustGrid';
import { CategoriesGrid } from './CategoriesGrid';
import { FeaturesAndBrands } from './FeaturesAndBrands';
import ProductGrid from './ProductGrid';

const HomeContent = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <Banner />
      <PromoBanner />
      <Hero />
      <TrustGrid />
      <CategoriesGrid />
      <FeaturesAndBrands />
      <ProductGrid />
    </main>
  );
};

export default HomeContent;
