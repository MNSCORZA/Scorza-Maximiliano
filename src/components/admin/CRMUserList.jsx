import React from 'react';
import { User, Eye, Mail, Phone, Calendar } from 'lucide-react';

const CRMUserList = ({ users, loading, onOpenUser360, getUserCRMDetails }) => {
  if (loading) {
    return (
      <div className="w-full text-center py-12 text-gray-400 font-black uppercase tracking-widest text-xs animate-pulse">
        Cargando base de datos de clientes...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full text-center py-12 text-gray-400 font-black uppercase tracking-widest text-xs">
        No se encontraron usuarios registrados.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/40 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Cliente / Usuario</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Contacto</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Compras</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Métricas (LTV)</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => {
              const details = getUserCRMDetails(user.id);
              return (
                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center font-bold text-sm uppercase">
                        {user.nombre ? user.nombre.charAt(0) : <User size={16} />}
                      </div>
                      <div>
                        <p className="font-black text-gray-800 uppercase text-xs leading-tight">
                          {user.nombre || "Sin Nombre"} {user.apellido || ""}
                        </p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                          ID: {user.id.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                        <Mail size={12} className="text-gray-400 shrink-0" /> {user.email || "---"}
                      </span>
                      {(user.codArea || user.telefono) && (
                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                          <Phone size={12} className="text-gray-400 shrink-0" /> {user.codArea || ""} {user.telefono || ""}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full font-black text-xs">
                      {details.userOrders.length}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <span className="font-black text-gray-900 text-xs">
                      ${Number(details.ltv).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => onOpenUser360(user)}
                      className="px-4 py-2 bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider rounded-xl hover:bg-indigo-600 transition-all inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Eye size={12} />
                      Ver Ficha 360°
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CRMUserList;
