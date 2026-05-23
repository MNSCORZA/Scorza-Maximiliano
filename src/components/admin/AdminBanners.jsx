import React from 'react';
import { useBannerManager } from '../../hooks/useBannerManager';
import { Loader2, CheckCircle } from 'lucide-react';
import { FormMarquee } from './FormMarquee';
import { FormPromoStatic } from './FormPromoStatic';
import { FormHero } from './FormHero';
import { FormCountdownOffer } from './FormCountdownOffer';

export const AdminBanners = () => {
  const { loading, saving, toast, banners, setters, handlers } = useBannerManager();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto relative">
      {toast.show && (
        <div className="fixed bottom-5 right-5 bg-gray-900 border border-gray-800 text-white px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-2xl z-50 animate-slide-in">
          <CheckCircle size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider">{toast.message}</span>
        </div>
      )}

      <FormMarquee promo={banners.promo} setPromo={setters.setPromo} onSubmit={handlers.handleSavePromo} saving={saving} />
      <FormPromoStatic promoStatic={banners.promoStatic} setPromoStatic={setters.setPromoStatic} onSubmit={handlers.handleSaveStatic} saving={saving} />
      <FormHero hero={banners.hero} setHero={setters.setHero} onSubmit={handlers.handleSaveHero} saving={saving} />
      <FormCountdownOffer offer={banners.offer} setOffer={setters.setOffer} onSubmit={handlers.handleSaveOffer} saving={saving} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          0% { transform: translateY(20px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};
