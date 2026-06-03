import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PERMISSIONS_LIST = [
  { id: 'isAdmin', label: 'Admin' },
  { id: 'productos', label: 'Productos' },
  { id: 'editar', label: 'Editar' },
  { id: 'borrar', label: 'Borrar' },
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'crm', label: 'CRM 360' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'reglas', label: 'Reglas' },
  { id: 'banners', label: 'Banners' },
  { id: 'marcas', label: 'Marcas' },
  { id: 'metricas', label: 'Métricas' },
  { id: 'cupones', label: 'Cupones' },
  { id: 'carritos', label: 'Carritos' },
  { id: 'historial', label: 'Historial' },
  { id: 'configuracion', label: 'Configuración' },
  { id: 'respaldos', label: 'Respaldos' },
  { id: 'arrepentimientos', label: 'Arrepentimientos' }
];

const PermissionGrid = ({ permisos = {}, onChange, disabled, isMobileGrid = false }) => {
  const isUserAdmin = permisos.isAdmin === true;

  if (isUserAdmin) {
    return (
      <div className="w-full bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3 text-indigo-600 animate-fade-in">
        <ShieldCheck size={18} className="shrink-0" />
        <p className="text-[10px] font-black uppercase tracking-widest leading-none">
          Acceso Total (Administrador del Sistema)
        </p>
      </div>
    );
  }

  if (isMobileGrid) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {PERMISSIONS_LIST.filter(p => p.id !== 'isAdmin').map((perm) => {
          const hasPerm = permisos[perm.id] || false;
          return (
            <button
              key={perm.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(perm.id, hasPerm)}
              className={`py-2.5 rounded-xl text-[9px] font-black uppercase transition-all tracking-wider ${
                hasPerm 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-white border border-gray-100 text-gray-400'
              }`}
            >
              {perm.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {PERMISSIONS_LIST.filter(p => p.id !== 'isAdmin').map((perm) => {
        const hasPerm = permisos[perm.id] || false;
        return (
          <label key={perm.id} className={`flex items-center gap-2 cursor-pointer group ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <input
              type="checkbox"
              checked={hasPerm}
              disabled={disabled}
              onChange={() => onChange(perm.id, hasPerm)}
              className="w-4 h-4 rounded border-gray-200 text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span className={`text-[9px] font-black uppercase transition-colors ${hasPerm ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-700'}`}>
              {perm.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default PermissionGrid;
