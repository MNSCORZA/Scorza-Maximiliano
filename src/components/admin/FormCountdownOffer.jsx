import React from 'react';
import { Save, Link2, Clock, Palette } from 'lucide-react';

export const FormCountdownOffer = ({ offer, setOffer, onSubmit, saving }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
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
  );
};
