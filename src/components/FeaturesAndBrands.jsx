import React from 'react';
import { CountdownBanner } from './CountdownBanner';
import { BrandCarousel } from './BrandCarousel';

export const FeaturesAndBrands = () => {
  return (
    <section className="w-full bg-white font-sans">
      <CountdownBanner />
      <BrandCarousel />
    </section>
  );
};
