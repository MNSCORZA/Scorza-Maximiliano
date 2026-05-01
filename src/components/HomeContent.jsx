import React from 'react';
import PromoBanner from './PromoBanner';
import Hero from './Hero';
import TrustGrid from './TrustGrid';
import Categories from './Categories';
import ProductGrid from './ProductGrid';



const HomeContent = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
     
      <PromoBanner />
      <Hero />
      <TrustGrid />
      <Categories />
      <ProductGrid />
   
    </main>
  );
};

export default HomeContent;