import React, { useState, useEffect } from 'react';
import { getBannerSettings, updateBannerSettings } from '../../fireBase/dataBase';
import { Save, Loader2, Image, Type, Link2, CheckCircle, X, Clock, Palette } from 'lucide-react';

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

      {/* FORMULARIO 1: MARQUEE MÓVIL */}
      <form onSubmit={handleSavePromo} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Barra de Texto Móvil (Marquee)</h2>
          <input 
            type="checkbox" 
            checked={promo.active} 
            onChange={(e) => setPromo({ ...promo, active: e.target.checked })}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Texto del anuncio largo</label>
            <div className="relative">
              <Type className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" value={promo.text} onChange={(e) => setPromo({ ...promo, text: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500" required />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Link de Destino</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" value={promo.link} onChange={(e) => setPromo({ ...promo, link: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
          <Save size={14} /> {saving ? 'Guardando...' : 'Guardar Marquee'}
        </button>
      </form>

      {/* FORMULARIO 2: BARRA FIJA BLANCA */}
      <form onSubmit={handleSaveStatic} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Barra de Anuncios Fija (PromoBanner)</h2>
          <input 
            type="checkbox" 
            checked={promoStatic.active} 
            onChange={(e) => setPromoStatic({ ...promoStatic, active: e.target.checked })}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Texto Corto Fijo</label>
            <div className="relative">
              <Type className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" value={promoStatic.text} onChange={(e) => setPromoStatic({ ...promoStatic, text: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500" required />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Link de Destino</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" value={promoStatic.link} onChange={(e) => setPromoStatic({ ...promoStatic, link: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
          <Save size={14} /> {saving ? 'Guardando...' : 'Guardar Barra Fija'}
        </button>
      </form>

      {/* FORMULARIO 3: HERO BANNER */}
      <form onSubmit={handleSaveHero} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Banner Principal (Hero)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Título Principal</label>
            <input type="text" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Subtítulo o Descripción</label>
            <input type="text" value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">URL de la Imagen de Fondo (Opcional)</label>
            <div className="relative">
              <Image className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" value={hero.imageUrl} onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-xs outline-none focus:border-indigo-500" placeholder="Dejar vacío para fondo negro" />
              {hero.imageUrl && (
                <button type="button" onClick={() => setHero({ ...hero, imageUrl: '' })} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Texto del Botón</label>
            <input type="text" value={hero.buttonText} onChange={(e) => setHero({ ...hero, buttonText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Link del Botón</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" value={hero.link} onChange={(e) => setHero({ ...hero, link: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
          <Save size={14} /> {saving ? 'Guardando...' : 'Guardar Hero'}
        </button>
      </form>

      {/* FORMULARIO 4: COMPONENTE OFERTA CONTADOR */}
      <form onSubmit={handleSaveOffer} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">Tarjeta de Oferta Destacada con Contador</h2>
          <input 
            type="checkbox" 
            checked={offer.active} 
            onChange={(e) => setOffer({ ...offer, active: e.target.checked })}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Texto de Etiqueta (Naranja)</label>
            <input type="text" value={offer.tagText} onChange={(e) => setOffer({ ...offer, tagText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Fecha y Hora de Expiración</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="datetime-local" value={offer.endDate} onChange={(e) => setOffer({ ...offer, endDate: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500" required />
            </div>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Título de la Oferta</label>
            <input type="text" value={offer.title} onChange={(e) => setOffer({ ...offer, title: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" required />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Descripción detallada</label>
            <textarea value={offer.description} onChange={(e) => setOffer({ ...offer, description: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500 min-h-[60px] resize-none" required />
          </div>
          
          {/* NUEVO CAMPO: SELECCIÓN DE PALETA DE COLORES */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5"><Palette size={12}/> Color de fondo del Componente</label>
            <select 
              value={offer.colorPalette || 'azul'} 
              onChange={(e) => setOffer({ ...offer, colorPalette: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500 h-[38px] cursor-pointer font-medium text-gray-700"
            >
              <option value="azul">Azul Deportivo (Original)</option>
              <option value="rojo">Rojo Emergencia (Oferta Agresiva)</option>
              <option value="premium">Premium (Negro y Dorado)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Título Sección Inferior</label>
            <input type="text" value={offer.bottomTitle} onChange={(e) => setOffer({ ...offer, bottomTitle: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Subtítulo Sección Inferior</label>
            <input type="text" value={offer.bottomSubtitle} onChange={(e) => setOffer({ ...offer, bottomSubtitle: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Texto del Botón</label>
            <input type="text" value={offer.buttonText} onChange={(e) => setOffer({ ...offer, buttonText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Link del Botón</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-3 text-gray-400" size={16} />
              <input type="text" value={offer.link} onChange={(e) => setOffer({ ...offer, link: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500" required />
            </div>
          </div>
        </div>
        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
          <Save size={14} /> {saving ? 'Guardando...' : 'Guardar Oferta'}
        </button>
      </form>

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
