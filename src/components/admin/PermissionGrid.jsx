import React from 'react';

const PERMISSIONS_LIST = [
  { id: 'isAdmin', label: 'Admin' },
  { id: 'editar', label: 'Editar' },
  { id: 'borrar', label: 'Borrar' },
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'crm', label: 'CRM 360' },
  { id: 'reglas', label: 'Reglas' },
  { id: 'banners', label: 'Banners' },
  { id: 'marcas', label: 'Marcas' },
  { id: 'metricas', label: 'Métricas' },
  { id: 'cupones', label: 'Cupones' },
  { id: 'carritos', label: 'Carritos' },
  { id: 'historial', label: 'Historial' }
];

const PermissionGrid = ({ permisos = {}, onChange, disabled, isMobileGrid = false }) => {
  const isUserAdmin = permisos.isAdmin === true;

  if (isMobileGrid) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {PERMISSIONS_LIST.map((perm) => {
          const isCurrentAdminToggle = perm.id === 'isAdmin';
          const hasPerm = isUserAdmin ? true : (permisos[perm.id] || false);
          const isButtonDisabled = disabled || (isUserAdmin && !isCurrentAdminToggle);

          return (
            <button
              key={perm.id}
              type="button"
              disabled={isButtonDisabled}
              onClick={() => onChange(perm.id, permisos[perm.id] || false)}
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
      {PERMISSIONS_LIST.map((perm) => {
        const isCurrentAdminToggle = perm.id === 'isAdmin';
        const hasPerm = isUserAdmin ? true : (permisos[perm.id] || false);
        const isLabelDisabled = disabled || (isUserAdmin && !isCurrentAdminToggle);

        return (
          <label key={perm.id} className={`flex items-center gap-2 cursor-pointer group ${isLabelDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <input
              type="checkbox"
              checked={hasPerm}
              disabled={isLabelDisabled}
              onChange={() => onChange(perm.id, permisos[perm.id] || false)}
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
