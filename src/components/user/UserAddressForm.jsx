import React from 'react';
import { MapPin, Save, Edit2, Hash, Navigation, FileText, Landmark } from 'lucide-react';

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
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900">
          <MapPin size={16} className="text-indigo-600"/> Datos de Envío y Facturación
        </h3>
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
            <Edit2 size={16} />
          </button>
        )}
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <InputField label="DNI / CUIL" icon={FileText} name="dni" placeholder="20-12345678-9" value={formData.dni} onChange={handleChange} disabled={!isEditing} colSpan="col-span-3" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InputField label="Cód. Área" icon={Hash} name="codArea" placeholder="011" value={formData.codArea} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
          <InputField label="Teléfono" icon={Hash} name="telefono" placeholder="15 1234-5678" value={formData.telefono} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InputField label="Provincia" icon={Landmark} name="provincia" placeholder="Buenos Aires" value={formData.provincia} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
          <InputField label="Localidad" icon={MapPin} name="localidad" placeholder="San Justo" value={formData.localidad} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
        </div>

        <InputField label="Dirección (Calle y Altura)" icon={MapPin} name="direccion" placeholder="Av. de Mayo 1234" value={formData.direccion} onChange={handleChange} disabled={!isEditing} colSpan="col-span-2" />

        <div className="grid grid-cols-2 gap-3">
          <InputField label="Piso / Depto" icon={Navigation} name="depto" placeholder="4° Piso C" value={formData.depto} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
          <InputField label="Código Postal" icon={Hash} name="cp" placeholder="1754" value={formData.cp} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
        </div>

        <InputField label="Entre Calles" icon={Navigation} name="entreCalles" placeholder="Arieta y Almafuerte" value={formData.entreCalles} onChange={handleChange} disabled={!isEditing} colSpan="col-span-2" />

        <div className="col-span-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block">
            Notas para el repartidor
          </label>
          <textarea
            disabled={!isEditing}
            name="notas"
            placeholder="Ej: Portón negro, tocar timbre dos veces..."
            value={formData.notas}
            onChange={handleChange}
            rows={2}
            className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-2.5 px-4 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all disabled:opacity-60 resize-none"
          />
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
              <Save size={14} /> Guardar Datos
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-5 bg-slate-100 text-slate-500 py-3.5 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all">
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserAddressForm;
