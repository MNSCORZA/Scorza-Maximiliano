import { useState, useEffect } from 'react';
import { getBannerSettings, updateBannerSettings } from '../fireBase/dataBase';

export const useBannerManager = () => {
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
        const [promoData, staticData, heroData, offerData] = await Promise.all([
          getBannerSettings('promo'),
          getBannerSettings('promo_static'),
          getBannerSettings('hero'),
          getBannerSettings('countdown_offer')
        ]);

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

  return {
    loading,
    saving,
    toast,
    banners: { promo, promoStatic, hero, offer },
    setters: { setPromo, setPromoStatic, setHero, setOffer },
    handlers: { handleSavePromo, handleSaveStatic, handleSaveHero, handleSaveOffer }
  };
};
