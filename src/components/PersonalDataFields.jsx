import React from 'react';

export const PersonalDataFields = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase text-indigo-600 tracking-wider border-b border-gray-100 pb-2">
        Datos Personales y Contacto
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Nombre</label>
          <input name="nombre" value={formData.nombre} onChange={onChange} placeholder="Nombre" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Apellido</label>
          <input name="apellido" value={formData.apellido} onChange={onChange} placeholder="Apellido" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">DNI / CUIL</label>
        <input name="dni" value={formData.dni} onChange={onChange} placeholder="Ej: 20-12345678-9" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Email de contacto</label>
        <input name="email" type="email" value={formData.email} onChange={onChange} placeholder="Email" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1 col-span-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Cód. Área</label>
          <input name="codArea" value={formData.codArea} onChange={onChange} placeholder="011" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
        </div>
        <div className="space-y-1 col-span-2">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Teléfono</label>
          <input name="telefono" value={formData.telefono} onChange={onChange} placeholder="15 1234-5678" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
        </div>
      </div>
    </div>
  );
};
