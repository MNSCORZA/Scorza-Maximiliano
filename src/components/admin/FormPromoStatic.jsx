import React from 'react';
import { Save, Type, Link2 } from 'lucide-react';

export const FormPromoStatic = ({ promoStatic, setPromoStatic, onSubmit, saving }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
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
  );
};
