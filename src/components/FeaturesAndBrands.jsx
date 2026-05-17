import React from 'react';
import { CountdownBanner } from './CountdownBanner';
import { BrandCarousel } from './BrandCarousel';

export const FeaturesAndBrands = () => {
  return (
    <section className="py-14 bg-slate-950 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

      <div className="container mx-auto px-4 max-w-7xl space-y-16 relative z-10">
        <CountdownBanner />
        <BrandCarousel />
      </div>
    </section>
  );
};
