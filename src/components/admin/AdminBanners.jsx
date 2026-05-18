import React, { useState, useEffect } from 'react';
import { getBannerSettings, updateBannerSettings } from '../../fireBase/dataBase';
import { Loader2, CheckCircle } from 'lucide-react';
import { FormMarquee } from './FormMarquee';
import { FormPromoStatic } from './FormPromoStatic';
import { FormHero } from './FormHero';
import { FormCountdownOffer } from './FormCountdownOffer';

export const AdminBanners = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [promo, setPromo] = useState({ text: '', link: '', active: true });
  const [promoStatic, setPromoStatic] = useState({ text: '', link: '', active: true });
  const [hero, setHero] = useState({ title: '', subtitle: '', imageUrl: '', buttonText: '', link: '' });
  const [offer, setOffer] = useState({ tagText: '', title: '', description: '', endDate: '', bottomTitle: '', bottomSubtitle: '', buttonText: '', link: '', colorPalette: 'azul', active: true });
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const promoData = await getBannerSettings('promo');
        const staticData = await getBannerSettings('promo_static');
        const heroData = await getBannerSettings('hero');
        const offerData = await getBannerSettings('countdown_offer');

        if (promoData) setPromo(promoData);
        if (staticData) setPromoStatic(staticData);
        if (heroData) setHero(heroData);
        if (offerData) setOffer(offerData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleSavePromo = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateBannerSettings('promo', promo);
      triggerToast('Marquee (Barra Móvil) actualizado');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStatic = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateBannerSettings('promo_static', promoStatic);
      triggerToast('Barra de Anuncios Fija actualizada');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHero = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateBannerSettings('hero', hero);
      triggerToast('Banner Principal (Hero) actualizado');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveOffer = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateBannerSettings('countdown_offer', offer);
      triggerToast('Oferta con Contador actualizada');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

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

      <FormMarquee promo={promo} setPromo={setPromo} onSubmit={handleSavePromo} saving={saving} />
      <FormPromoStatic promoStatic={promoStatic} setPromoStatic={setPromoStatic} onSubmit={handleSaveStatic} saving={saving} />
      <FormHero hero={hero} setHero={setHero} onSubmit={handleSaveHero} saving={saving} />
      <FormCountdownOffer offer={offer} setOffer={setOffer} onSubmit={handleSaveOffer} saving={saving} />

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
