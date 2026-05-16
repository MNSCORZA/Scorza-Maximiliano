import React, { useState, useEffect } from 'react';
import { getBannerSettings, updateBannerSettings } from '../../fireBase/dataBase';
import { Save, Loader2, Image, Type, Link2, CheckCircle, X } from 'lucide-react';

export const AdminBanners = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [promo, setPromo] = useState({ text: '', link: '', active: true });
  const [hero, setHero] = useState({ title: '', subtitle: '', imageUrl: '', buttonText: '', link: '' });
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const promoData = await getBannerSettings('promo');
        const heroData = await getBannerSettings('hero');
        if (promoData) setPromo(promoData);
        if (heroData) setHero(heroData);
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
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const handleSavePromo = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateBannerSettings('promo', promo);
      triggerToast('PromoBanner actualizado con éxito');
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
      triggerToast('Banner Principal actualizado con éxito');
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

      <form onSubmit={handleSavePromo} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Editar Barra de Anuncios (PromoBanner)</h2>
          <input 
            type="checkbox" 
            checked={promo.active} 
            onChange={(e) => setPromo({ ...promo, active: e.target.checked })}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Texto del anuncio</label>
            <div className="relative">
              <Type className="absolute left-3 top-3 text-gray-400" size={16} />
              <input 
                type="text" 
                value={promo.text} 
                onChange={(e) => setPromo({ ...promo, text: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500"
                placeholder="Ej: ¡Envíos gratis en compras mayores a $50!"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Enlace o URL de destino</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-3 text-gray-400" size={16} />
              <input 
                type="text" 
                value={promo.link} 
                onChange={(e) => setPromo({ ...promo, link: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500"
                placeholder="Ej: /Catalogo?category=Electro"
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
          <Save size={14} /> {saving ? 'Guardando...' : 'Guardar Promo'}
        </button>
      </form>

      <form onSubmit={handleSaveHero} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Editar Banner Principal (Hero)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Título Principal</label>
            <input 
              type="text" 
              value={hero.title} 
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Subtítulo o Descripción</label>
            <input 
              type="text" 
              value={hero.subtitle} 
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">URL de la Imagen de Fondo (Opcional)</label>
            <div className="relative">
              <Image className="absolute left-3 top-3 text-gray-400" size={16} />
              <input 
                type="text" 
                value={hero.imageUrl} 
                onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-xs outline-none focus:border-indigo-500"
                placeholder="https://images.unsplash.com/... (Dejar vacío para fondo negro)"
              />
              {hero.imageUrl && (
                <button 
                  type="button" 
                  onClick={() => setHero({ ...hero, imageUrl: '' })}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Texto del Botón</label>
            <input 
              type="text" 
              value={hero.buttonText} 
              onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-indigo-500"
              placeholder="Ej: Ver Ofertas"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Link del Botón</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-3 text-gray-400" size={16} />
              <input 
                type="text" 
                value={hero.link} 
                onChange={(e) => setHero({ ...hero, link: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-indigo-500"
                placeholder="Ej: /Catalogo"
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
          <Save size={14} /> {saving ? 'Guardando...' : 'Guardar Hero'}
        </button>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          0% { transform: translateY(20px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};
