import React from 'react';
import { Save, Image, Link2, X } from 'lucide-react';

export const FormHero = ({ hero, setHero, onSubmit, saving }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
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
  );
};
