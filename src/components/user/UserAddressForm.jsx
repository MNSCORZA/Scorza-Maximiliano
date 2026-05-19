
import React from 'react';
import { MapPin, Save, Edit2, Hash, Navigation } from 'lucide-react';

const InputField = ({ label, icon: Icon, name, placeholder, value, onChange, disabled, colSpan = "col-span-2" }) => (
  <div className={colSpan}>
    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
      <input 
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-2.5 pl-9 pr-3 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all disabled:opacity-60"
      />
    </div>
  </div>
);

const UserAddressForm = ({ formData, isEditing, setIsEditing, handleChange, handleUpdate }) => {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900">
          <MapPin size={16} className="text-indigo-600"/> Mis Datos
        </h3>
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
            <Edit2 size={16} />
          </button>
        )}
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Cód. Área" icon={Hash} name="codArea" placeholder="011" value={formData.codArea} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
          <InputField label="Teléfono" icon={Hash} name="telefono" placeholder="1234-5678" value={formData.telefono} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
        </div>

        <InputField label="Dirección" icon={MapPin} name="direccion" placeholder="Calle y Altura" value={formData.direccion} onChange={handleChange} disabled={!isEditing} colSpan="col-span-2" />

        <div className="grid grid-cols-2 gap-3">
          <InputField label="Piso/Depto" icon={Navigation} name="depto" placeholder="2° B" value={formData.depto} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
          <InputField label="CP" icon={Hash} name="cp" placeholder="1425" value={formData.cp} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
        </div>

        <InputField label="Entre Calles" icon={Navigation} name="entreCalles" placeholder="Tucumán y Lavalle" value={formData.entreCalles} onChange={handleChange} disabled={!isEditing} colSpan="col-span-2" />

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
              <Save size={14} /> Guardar
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 bg-slate-100 text-slate-500 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all">
              X
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserAddressForm;
