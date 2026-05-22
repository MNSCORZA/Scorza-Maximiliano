import React from 'react';

export const ShippingFields = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase text-indigo-600 tracking-wider border-b border-gray-100 pb-2">
        Datos de Entrega y Envío
      </h3>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Dirección (Calle y Altura)</label>
        <input name="direccion" value={formData.direccion} onChange={onChange} placeholder="Ej: Av. de Mayo 1234" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Piso / Depto</label>
          <input name="depto" value={formData.depto} onChange={onChange} placeholder="4° Piso C (Opcional)" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Código Postal</label>
          <input name="cp" value={formData.cp} onChange={onChange} placeholder="1754" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Localidad</label>
          <input name="localidad" value={formData.localidad} onChange={onChange} placeholder="San Justo" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Provincia</label>
          <input name="provincia" value={formData.provincia} onChange={onChange} placeholder="Buenos Aires" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Entre Calles</label>
        <input name="entreCalles" value={formData.entreCalles} onChange={onChange} placeholder="Arieta y Almafuerte" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Notas para el repartidor</label>
        <textarea name="notas" value={formData.notas} onChange={onChange} placeholder="Ej: Portón negro..." rows={2} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-3 px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all resize-none" />
      </div>
    </div>
  );
};
