import React from 'react';
import { Search, Filter, ArrowRight, User, Loader2 } from 'lucide-react';

const CRMUserList = ({ 
  users, 
  loading, 
  onOpenUser360, 
  getUserCRMDetails,
  searchTerm,
  setSearchTerm,
  minLtvFilter,
  setMinLtvFilter,
  hasMore,
  handleLoadMore
}) => {

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
        <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Sincronizando Base de Clientes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Contenedor de Filtros y Búsqueda */}
      <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-xl shadow-slate-100/40 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, apellido o email..."
            className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-xs font-bold text-gray-700 placeholder:text-gray-400 outline-none focus:bg-white focus:border-indigo-600/30 transition-all"
          />
        </div>

        <div className="relative flex items-center">
          <Filter className="absolute left-4 text-gray-400" size={18} />
          <select
            value={minLtvFilter}
            onChange={(e) => setMinLtvFilter(e.target.value)}
            className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-xs font-bold text-gray-500 outline-none focus:bg-white focus:border-indigo-600/30 transition-all appearance-none cursor-pointer"
          >
            <option value="all">Todos los Volúmenes de Compra</option>
            <option value="10000">Clientes Oro (+ $10.000)</option>
            <option value="50000">Clientes Platino (+ $50.000)</option>
            <option value="100000">Clientes VIP (+ $100.000)</option>
          </select>
        </div>
      </div>

      {/* Lista de Fichas */}
      {users.length === 0 ? (
        <div className="bg-white p-12 rounded-[32px] text-center border border-dashed border-gray-200">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No se encontraron clientes con los filtros aplicados</p>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-slate-100/30 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {users.map((u) => {
              const { userOrders, ltv } = getUserCRMDetails(u.id);
              return (
                <div 
                  key={u.id} 
                  onClick={() => onOpenUser360(u)}
                  className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-black text-sm uppercase group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                      {u.nombre ? u.nombre.charAt(0) : <User size={16} />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-sm text-gray-900 uppercase truncate leading-tight">
                        {u.nombre || 'Sin Nombre'} {u.apellido || ''}
                      </h4>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5 truncate">ID: {u.id.substring(0, 8)}...</p>
                      <p className="text-[11px] text-gray-500 font-medium mt-1 truncate md:hidden">{u.email}</p>
                    </div>
                  </div>

                  {/* Detalle ampliado para Escritorio/Tablet */}
                  <div className="hidden md:flex flex-col min-w-0 max-w-xs">
                    <span className="text-xs font-bold text-gray-600 truncate">{u.email}</span>
                    <span className="text-[10px] font-bold text-gray-400 mt-0.5">{u.telefono || 'Sin teléfono'}</span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs font-black text-gray-950">${Number(ltv).toLocaleString('es-AR')}</p>
                      <p className="text-[9px] font-black uppercase text-indigo-500 tracking-wider mt-0.5">{userOrders.length} compras</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Botón de Paginación Fluida */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-md shadow-slate-100 hover:bg-slate-50 transition-all"
          >
            Cargar Más Clientes
          </button>
        </div>
      )}
    </div>
  );
};

export default CRMUserList;
